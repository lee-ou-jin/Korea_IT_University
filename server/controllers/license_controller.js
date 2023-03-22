const HttpError = require('../models/http-error');
const License = require('../models/license');

// 자격증 + 자격증 알림관련

// 자격증 목록
exports.licenseList = async (req, res, next) => {
    let licenseList;
    try {
        [licenseList] = await License.licenseList();
    } catch (err) {
        const error = new HttpError('자격증 목록을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(licenseList);
};

// 자격증 알림신청
exports.applyForNotification = async (req, res, next) => {
    const license_name = req.body.license_name;
    const user_id = req.userData.userId;
    const findUser = await License.findUser(user_id, license_name);
    // let test = [
    //     { exam_date: '2023-01-26', exam_type: '필기시험' },
    //     { exam_date: '2023-01-28', exam_type: '실기시험' },
    // ]; // 프론트로부터 받을 데이터 예시
    if (findUser[0].length > 0) {
        License.deleteLicense(user_id, license_name);
        return res.status(200).json({
            message: '알림신청한 회원 데이터 삭제 성공',
        });
    } else {
        const [findLicense] = await License.findLicense(license_name);
        findLicense.forEach(async (result) => {
            let addNotification = new License(null, user_id, license_name + ' 자격증 ' + result.exam_type + ' 일주일 남았습니다.', null, license_name, result.exam_date, result.exam_type);

            try {
                await addNotification.save();
            } catch (err) {
                console.log(addNotification);
                const error = new HttpError('알림신청한 회원 데이터 저장 실패', 500);
                return next(error);
            }
        });
        res.status(200).json({
            message: '알림신청한 회원 데이터 저장 성공',
        });
    }
};

// 당일 보내줘야하는 자격증 알림 출력 (당일날짜 +7 = exam_date라면 "00자격증 필기 원서접수까지 일주일 남았습니다." 출력)

exports.todayLicenseList = async (req, res, next) => {
    const user_id = req.userData.userId;

    let todayLicenseList;
    try {
        [todayLicenseList] = await License.todayLicenseNotice(user_id);
    } catch (err) {
        const error = new HttpError('자격증 목록을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(todayLicenseList);
};
