const db = require('../utils/database');

module.exports = class Post {
    constructor(id, title, content, user_id, post_type, anonymous) {
        (this.id = id), (this.title = title), (this.content = content), (this.user_id = user_id), (this.post_type = post_type), (this.anonymous = anonymous);
    }

    // post 테이블에 글 저장하기
    save() {
        return db.execute('INSERT INTO post (title,content,user_id,post_type, anonymous) VALUES (?,?,?,?,?)', [this.title, this.content, this.user_id, this.post_type, this.anonymous]);
    }

    // 전체 글 리스트 출력하기
    static fetchAll() {
        return db.execute(
            'SELECT post.id,title, post.content, post.created_at, nickname, post.anonymous, reply.cnt as reply_count, like_count.cnt as like_count FROM post JOIN user ON post.user_id = user.id LEFT JOIN (select post_id , count(reply.post_id) as cnt from reply group by reply.post_id) reply ON post.id = reply.post_id LEFT JOIN (select post_id , count(like_count.post_id) as cnt from like_count group by like_count.post_id) like_count ON post.id = like_count.post_id ORDER BY created_at DESC'
        );
    }

    // post_id에 해당하는 글 상세보기
    static fetchOne(post_id) {
        return db.execute(
            'SELECT post.id,title, post.content, post.created_at, nickname, post.anonymous, reply.cnt as reply_count, like_count.cnt as like_count,post.user_id FROM post JOIN user ON post.user_id = user.id LEFT JOIN (select post_id , count(reply.post_id) as cnt from reply group by reply.post_id) reply ON post.id = reply.post_id LEFT JOIN (select post_id , count(like_count.post_id) as cnt from like_count group by like_count.post_id) like_count ON post.id = like_count.post_id WHERE post.id = ?',
            [post_id]
        );
    }

    // 글 삭제하기 (글쓴이와 현재 로그인된 회원아이디가 일치해야하고, post_id와 id가 일치하는 글을 삭제해야 함)
    static deletePost(post_id) {
        return db.execute('DELETE FROM post WHERE post.id = ?', [post_id]);
    }

    // user_id가 쓴 글 목록
    static findMyPost(user_id) {
        return db.execute(
            'SELECT post.id,title, post.content, post.created_at, nickname, post.anonymous, reply.cnt as reply_count, like_count.cnt as like_count,post.user_id FROM post JOIN user ON post.user_id = user.id LEFT JOIN (select post_id , count(reply.post_id) as cnt from reply group by reply.post_id) reply ON post.id = reply.post_id LEFT JOIN (select post_id , count(like_count.post_id) as cnt from like_count group by like_count.post_id) like_count ON post.id = like_count.post_id WHERE post.user_id = ?',
            [user_id]
        );
    }

    // 인기글 목록 (일주일 이내 작성된 글 중에서 상위 1O개)
    static popularPost() {
        return db.execute(
            'SELECT A.id,A.title,A.content,A.created_at,A.user_id , A.anonymous, ifnull(B.cnt,0) as like_count, ifnull(C.cnt,0) as reply_count, D.nickname FROM post as A LEFT OUTER JOIN (SELECT post_id, count(*) as cnt FROM like_count GROUP BY post_id )as B ON B.post_id = A.id LEFT OUTER JOIN (SELECT post_id, count(*) as cnt FROM reply GROUP BY post_id) as C ON C.post_id = A.id LEFT OUTER JOIN (SELECT id, nickname FROM user) as D ON D.id = A.user_id WHERE created_at > DATE_SUB(now(),INTERVAL 7 DAY) ORDER BY B.cnt DESC LIMIT 10'
        );
    }

    // 쿼리스트링으로 검색
    static findPost(keyword) {
        return db.execute(
            'SELECT post.id,title, post.content, post.created_at, nickname, post.anonymous, reply.cnt as reply_count, like_count.cnt as like_count FROM post JOIN user ON post.user_id = user.id LEFT JOIN (select post_id , count(reply.post_id) as cnt from reply group by reply.post_id) reply ON post.id = reply.post_id LEFT JOIN (select post_id , count(like_count.post_id) as cnt from like_count group by like_count.post_id) like_count ON post.id = like_count.post_id WHERE post.title LIKE ? OR post.content LIKE ? ORDER BY created_at DESC',
            [keyword, keyword]
        );
    }
};
