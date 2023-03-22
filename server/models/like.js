const db = require('../utils/database');
// 해당 user_id와 post_id와 동일한 데이터가 존재한다면, 데이터 삭제하는 sql문 / 없다면 추가
module.exports = class Like {
    constructor(id, user_id, post_id) {
        (this.id = id), (this.user_id = user_id), (this.post_id = post_id);
    }

    save() {
        return db.execute('INSERT INTO like_count (user_id,post_id) VALUES (?,?)', [this.user_id, this.post_id]);
    }

    // 좋아요 테이블에서 사용자 찾기 - 해당 사용자가 이미 해당 글에 좋아요를 눌렀다면 조회될 것임
    static findUser(user_id, post_id) {
        return db.execute('SELECT * FROM like_count WHERE user_id = ? AND post_id = ?', [user_id, post_id]);
    }

    // 좋아요 누른 적 있으면 삭제
    static deleteLike(user_id, post_id) {
        return db.execute('DELETE FROM like_count WHERE user_id = ? AND post_id = ?', [user_id, post_id]);
    }
    // // 내가 좋아요 누른 글 조회
    // static myLikeList(user_id) {
    //     return db.execute('SELECT post.title,post.content,post.created_at FROM like_count JOIN post ON like_count.post_id = post.id WHERE like_count.user_id = ?', [user_id]);
    // }
};
