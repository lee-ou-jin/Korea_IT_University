const HttpError = require('../models/http-error');
const Notice = require('../models/notice');
const Reply = require('../models/reply');
const Post = require('../models/post');

// 댓글 + 대댓글 + 댓글 알림 관련

// 댓글 리스트
exports.getReply = async (req, res, next) => {
    let replyList;
    const post_id = req.params.pid;
    try {
        [replyList] = await Reply.replyList(post_id);
    } catch (err) {
        console.log(replyList);
        const error = new HttpError('댓글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(replyList);
};

// 댓글 작성 - layer => 0
exports.createReply = async (req, res, next) => {
    const { content, anonymous } = req.body;
    const post_id = req.params.pid;
    const user_id = req.userData.userId;

    let title;
    let postOne;
    const url = 'http://localhost:3000/posts/' + post_id;

    try {
        [postOne] = await Post.fetchOne(post_id);
    } catch (err) {
        const error = new HttpError('글을 찾지 못했습니다.', 500);
        return next(error);
    }

    const createReply = new Reply(null, content, 0, null, post_id, user_id, anonymous);
    try {
        await createReply.saveReply();
    } catch (err) {
        console.log(createReply);
        const error = new HttpError('댓글이 작성되지 않았습니다.');
        return next(error);
    }

    // 댓글이 작성되면 댓글 알림 DB에도 저장되어야 함

    const author_id = postOne[0].user_id; // 글쓴이
    title = postOne[0].title;
    title = title.slice(0, 5) + '...';

    const notice = new Notice(null, author_id, '"' + title + '"' + ' 글에 댓글이 달렸습니다.', url);

    try {
        await notice.save();
    } catch (err) {
        const error = new HttpError('댓글 알림 저장 실패', 500);
        return next(error);
    }
    res.status(200).json({
        message: '댓글 작성, 알림 저장 성공',
    });
};

// // 대댓글 작성 - layer => 1 / 프론트에서 해당 그룹번호를 req로 전송
exports.createReply2 = async (req, res, next) => {
    const content = req.body.content;
    const post_id = req.params.pid;
    const user_id = req.userData.userId;
    const group_id = req.body.group_id; // 댓글의 그룹번호 값 == 대댓글의 그룹번호 값

    const createReply = new Reply(null, content, 1, group_id, post_id, user_id);
    try {
        await createReply.saveReply();
    } catch (err) {
        const error = new HttpError('댓글이 작성되지 않았습니다.');
        return next(error);
    }
    res.status(200).json({
        message: '댓글이 작성되었습니다.',
    });
};

// 댓글 삭제
exports.deleteReply = async (req, res, next) => {
    const reply_id = req.body.replyId;
    const post_id = req.params.pid;

    let reply;

    try {
        reply = await Reply.findReply(reply_id);
    } catch (err) {
        const error = new HttpError('삭제하려는 댓글이 존재하지 않습니다.', 500);
        return next(error);
    }

    if (reply[0][0].user_id !== req.userData.userId) {
        const error = new HttpError('댓글 삭제 권한 없음', 401);
        return next(error);
    }

    try {
        await Reply.deleteReply(reply_id, post_id, user_id);
    } catch (err) {
        const error = new HttpError('댓글 삭제 실패', 500);
        return next(error);
    }
    res.status(200).json({
        message: '댓글 삭제 성공',
    });
};

// 댓글 알림 리스트 출력
exports.replyNoticeList = async (req, res, next) => {
    const user_id = req.userData.userId; // req.userData.userId;

    let replyNoticeList;
    try {
        [replyNoticeList] = await Notice.replyNoticeList(user_id);
    } catch (err) {
        const error = new HttpError('자격증 목록을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(replyNoticeList);
};

// 내가 댓글단 글
exports.myReplyList = async (req, res, next) => {
    let replyList;
    const user_id = req.userData.userId;
    try {
        [replyList] = await Reply.findMyReply(user_id);
    } catch (err) {
        const error = new HttpError('글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(replyList);
};
