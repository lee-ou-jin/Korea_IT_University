const express = require('express');
const { body } = require('express-validator');

const postController = require('../controllers/post-controller');
const replyController = require('../controllers/reply-controller');

const verifyToken = require('../middleware/verify-token');

const router = express.Router();

// 유효 토큰 검증 미들웨어
router.use(verifyToken);

// ---- 글 ----

// GET => api/posts/ 전체 글 목록
router.get('/', postController.getPosts);

// POST => api/posts/ 글쓰기 - 제목 5자 이상, 내용 200자 이내
router.post('/', [body('title').isLength({ min: 5 }), body('content').isLength({ max: 200 })], postController.createPost);

// GET => api/posts/popular 인기글 목록
router.get('/popular', postController.getPopularPosts);

// GET => api/posts/search?result= 검색
router.get('/search', postController.searchPost);

// GET => api/posts/:pid 글번호가 특정하는 글 보기
router.get('/:pid', postController.getPost);

// DELETE => api/posts/:pid 글번호가 특정하는 글 삭제
router.delete('/:pid', postController.deletePost);

// ---- 댓글, 대댓글 ----

// GET => api/posts/:pid/reply 댓글 리스트
router.get('/:pid/reply', replyController.getReply);

// POST => api/posts/:pid/reply 댓글쓰기 + 댓글알림 저장
router.post('/:pid/reply', replyController.createReply);

// // POST => api/posts/reply2 대댓글쓰기
router.post('/:pid/reply2', replyController.createReply2);

module.exports = router;
