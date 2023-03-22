const db = require('../utils/database');

// 자격증 + 자격증 알림 관련

module.exports = class License {
    constructor(id, user_id, message, url, license_name, exam_date, exam_type) {
        (this.id = id), (this.user_id = user_id), (this.message = message), (this.url = url), (this.license_name = license_name);
        (this.exam_date = exam_date), (this.exam_type = exam_type);
    }

    // 알림 받을 회원의 아이디, 메세지, 자격증이름, 응시일, 응시타입 저장
    save() {
        return db.execute('INSERT INTO license_notice (user_id,message,license_name,exam_date, exam_type) VALUES (?,?,?,?,?)', [
            this.user_id,
            this.message,
            this.license_name,
            this.exam_date,
            this.exam_type,
        ]);
    }

    // 알림신청을 이미 한 적 있으면 알림신청 취소
    static deleteLicense(user_id, license_name) {
        return db.execute('DELETE FROM license_notice WHERE user_id = ? AND license_name = ?', [user_id, license_name]);
    }

    // license_notice 테이블에서 해당 자격증 알림신청한 사용자 찾기
    static findUser(user_id, license_name) {
        return db.execute('SELECT * FROM license_notice WHERE user_id = ? AND license_name = ?', [user_id, license_name]);
    }

    // license 테이블에서 해당 자격증의 이름, 응시일 데이터 찾기
    static findLicense(license_name) {
        return db.execute('SELECT * FROM license WHERE name = ?', [license_name]);
    }

    // 전체 자격증 목록
    static licenseList() {
        return db.execute('SELECT DISTINCT name,major FROM license GROUP BY name ORDER BY name');
    }

    // 당일 보내줘야하는 자격증 알림 출력 (당일날짜 +7 = exam_date라면 "00자격증 필기 원서접수 일주일 남았습니다." 출력)
    static todayLicenseNotice(user_id) {
        return db.execute("SELECT * FROM license_notice WHERE user_id = ? AND date_format(exam_date,'%Y-%m-%d') = date_format(DATE_ADD(now(),INTERVAL 7 DAY),'%Y-%m-%d')", [user_id]);
    }
};
