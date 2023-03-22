const HttpError = require('../models/http-error');
const Scrap = require('../models/scrap');

// 스크랩 버튼을 눌렀을 때 DB에 저장
exports.saveScrap = async (req, res, next) => {
    const post_id = req.params.pid;
    const user_id = req.userData.userId;
    const findUser = await Scrap.findUser(user_id, post_id);

    if (findUser[0].length > 0) {
        Scrap.deleteScrap(user_id, post_id);
        return res.status(200).json({
            message: '스크랩한 글 삭제 성공',
        });
    } else {
        const addScrap = new Scrap(null, user_id, post_id);

        try {
            await addScrap.save();
        } catch (err) {
            const error = new HttpError('스크랩한 글 저장 실패', 500);
            return next(error);
        }

        res.status(200).json({
            message: '스크랩한 글 저장 성공',
        });
    }
};

// 내가 스크랩 한 글
exports.myScrapList = async (req, res, next) => {
    let scrapList;
    const user_id = req.userData.userId;
    try {
        [scrapList] = await Scrap.myScrapList(user_id);
    } catch (err) {
        const error = new HttpError('글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(scrapList);
};
