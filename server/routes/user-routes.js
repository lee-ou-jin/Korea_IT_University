const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user-controller');

const router = express.Router();

// POST => api/signup 회원가입 - id는 숫자만 (학번), 비밀번호는 6자 이상
router.post('/signup', [body('id').isInt(), body('password').isLength({ min: 6 }), body('major').not().isEmpty(), body('nickname').not().isEmpty()], userController.signup);

// POST => api/login 로그인
router.post('/login', userController.login);

module.exports = router;
