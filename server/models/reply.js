const db = require('../utils/database');
module.exports = class Reply {
    constructor(id, content, layer, group, post_id, user_id, anonymous) {
        (this.id = id), (this.content = content), (this.layer = layer), (this.group = group), (this.post_id = post_id), (this.user_id = user_id), (this.anonymous = anonymous);
    }

    async saveReply() {
        if (this.layer == 0) {
            // 댓글이라면
            await db.execute('SET @last_group_id = (SELECT group_id FROM reply ORDER BY group_id DESC LIMIT 1)');

            try {
                const result = await db.execute('INSERT INTO reply (content,layer,group_id, post_id,user_id,anonymous) VALUES (?,?,@last_group_id+1,?,?,?)', [
                    this.content,
                    this.layer,
                    this.post_id,
                    this.user_id,
                    this.anonymous,
                ]);
                return result;
            } catch (err) {
                return err;
            }
        } else {
            // 대댓글이라면
            return db.execute('INSERT INTO reply (content,layer,group_id, post_id,user_id) VALUES (?,?,?,?,?)', [this.content, this.layer, this.group, this.post_id, this.user_id]);
        }
    }

    // 댓글 리스트
    static replyList(post_id) {
        return db.execute('SELECT content,created_at,layer,group_id,anonymous,nickname FROM hanta.reply JOIN user ON reply.user_id = user.id AND post_id = ?', [post_id]);
    }

    // 댓글 삭제 - db에서 삭제 대신 내용 변경으로
    static deleteReply(reply_id, post_id, user_id) {
        return db.execute('UPDATE reply SET content = "삭제된 댓글입니다." WHERE reply.id = ? AND post_id = ? AND user_id = ?', [reply_id, post_id, user_id]);
    }

    // 댓글 찾기
    static findReply(reply_id) {
        return db.execute('SELECT * FROM reply WHERE reply.id = ?', [reply_id]);
    }

    // 내가 쓴 댓글
    static findMyReply(user_id) {
        return db.execute('SELECT post.* FROM reply RIGHT JOIN post ON reply.post_id = post.id WHERE reply.user_id = ? GROUP BY post.id', [user_id]);
    }
};
