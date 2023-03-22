const Post = require('../models/post');

const HttpError = require('../models/http-error'); // 에러메세지
const { validationResult } = require('express-validator');

// 전체 글 목록
exports.getPosts = async (req, res, next) => {
    let postAll;
    try {
        [postAll] = await Post.fetchAll();
    } catch (err) {
        const error = new HttpError('글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(postAll);
};

// post_id에 해당하는 글 보기
exports.getPost = async (req, res, next) => {
    let postOne;
    const post_id = req.params.pid;
    try {
        [postOne] = await Post.fetchOne(post_id);
    } catch (err) {
        const error = new HttpError('글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(postOne);
};

// 글쓰기
exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length !== 0) {
        const error = new HttpError('제목은 5자 이상, 내용은 200자 이내로 적어주세요.', 401);
        return next(error);
    }

    const { title, content, userId, post_type, anonymous } = req.body;

    const createPost = new Post(null, title, content, userId, post_type, anonymous);

    try {
        await createPost.save();
    } catch (err) {
        const error = new HttpError('글이 작성되지 않았습니다.', 500);
        return next(error);
    }
    res.status(200).json({
        message: '글이 작성되었습니다.',
    });
};

// 글 삭제하기
exports.deletePost = async (req, res, next) => {
    const post_id = req.params.pid; // url에서 글 번호 받기
    const user_id = req.userData.userId;
    let post; // 삭제하려는 글 데이터

    try {
        post = await Post.fetchOne(post_id);
    } catch (err) {
        const error = new HttpError('삭제하려는 글이 존재하지 않습니다.', 500);
        return next(error);
    }

    if (post[0][0].user_id !== user_id) {
        // 글쓴이와 현재 로그인한 회원의 아이디가 일치하지 않는다면,
        const error = new HttpError('글 삭제 권한 없음', 401);
        return next(error);
    }

    try {
        await Post.deletePost(post_id);
    } catch (err) {
        const error = new HttpError('글 삭제 실패', 500);
        return next(error);
    }
    res.status(200).json({
        message: '글 삭제 성공',
    });
};

// 마이페이지 - 내가 쓴 글
exports.myPostList = async (req, res, next) => {
    let getMyPost;

    const user_id = req.userData.userId;

    try {
        getMyPost = await Post.findMyPost(user_id);
    } catch (err) {
        const error = new HttpError('글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(getMyPost[0]);
};

// 인기글 목록
exports.getPopularPosts = async (req, res, next) => {
    let popularPosts;
    try {
        [popularPosts] = await Post.popularPost();
    } catch (err) {
        const error = new HttpError('글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(popularPosts);
};

// 검색
exports.searchPost = async (req, res, next) => {
    let searchPost;
    let keyword = req.query.result;
    keyword = '%' + keyword + '%';
    try {
        [searchPost] = await Post.findPost(keyword);
    } catch (err) {
        const error = new HttpError('검색 실패', 500);
        return next(error);
    }
    res.status(200).json(searchPost);
};
