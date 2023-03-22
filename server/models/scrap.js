const db = require('../utils/database');
// 해당 user_id와 post_id와 동일한 데이터가 존재한다면, 데이터 삭제하는 sql문. 없다면 추가
module.exports = class Scrap {
    constructor(id, user_id, post_id) {
        (this.id = id), (this.user_id = user_id), (this.post_id = post_id);
    }

    save() {
        return db.execute('INSERT INTO scrap (user_id,post_id) VALUES (?,?)', [this.user_id, this.post_id]);
    }

    // 스크랩 테이블에서 사용자 찾기 - 해당 사용자가 이미 해당 글에 스크랩 버튼을 눌렀다면 조회될 것임
    static findUser(user_id, post_id) {
        return db.execute('SELECT * FROM scrap WHERE user_id = ? AND post_id = ?', [user_id, post_id]);
    }

    // 스크랩 누른 적 있으면 삭제
    static deleteScrap(user_id, post_id) {
        return db.execute('DELETE FROM scrap WHERE user_id = ? AND post_id = ?', [user_id, post_id]);
    }

    // 내가 스크랩한 글 조회
    static myScrapList(user_id) {
        return db.execute('SELECT post.* FROM scrap JOIN post ON scrap.post_id = post.id WHERE scrap.user_id = ?', [user_id]);
    }
};
