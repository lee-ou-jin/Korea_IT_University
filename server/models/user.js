// 회원테이블
const db = require('../utils/database');

module.exports = class User {
    constructor(id, password, nickname, major) {
        (this.id = id), (this.password = password), (this.nickname = nickname), (this.major = major);
    }

    // 회원가입 정보 DB에 저장
    save() {
        return db.execute('INSERT INTO user (id,password,nickname,major) VALUES (?,?,?,?)', [this.id, this.password, this.nickname, this.major]);
    }

    // user_id에 해당하는 유저 정보 출력
    static findUser(user_id) {
        return db.execute('SELECT * FROM user WHERE user.id = ?', [user_id]);
    }
};
