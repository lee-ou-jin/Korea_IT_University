const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const HttpError = require('../models/http-error');

// 회원가입
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length !== 0) {
        const error = new HttpError('회원가입 정보를 다시 확인해주세요. id는 숫자만, 비밀번호는 6자 이상 입력해주세요.', 422);
        return next(error);
    }

    const { id, password, nickname, major } = req.body;

    let existUser; // 같은 아이디를 가진 회원이 있는지 확인
    existUser = await User.findUser(id);

    if (existUser[0].length > 0) {
        const error = new HttpError('이미 사용중인 아이디입니다.', 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 8);
    } catch (err) {
        const error = new HttpError('회원가입 실패', 500);
        return next(error);
    }

    const createUser = new User(id, hashedPassword, nickname, major);
    try {
        await createUser.save();
    } catch (err) {
        const error = new HttpError('회원가입 실패', 500);
        return next(error);
    }
    // 회원가입 하면 로그인 됨
    let token;
    try {
        token = jwt.sign({ userId: createUser.id }, process.env.SECRET_KEY);
    } catch (err) {
        const error = new HttpError('회원가입 실패', 500);
        return next(error);
    }
    res.status(200).json({
        // 프론트로 반환
        userId: createUser.id,
        token: token,
    });
};

exports.login = async (req, res, next) => {
    const { id, password } = req.body;

    let existUser; // DB에 회원정보가 있는지 확인
    try {
        existUser = await User.findUser(id);
    } catch (err) {
        const error = new HttpError('로그인 실패', 500);
        return next(error);
    }
    if (!existUser[0][0]) {
        const error = new HttpError('아이디 또는 비밀번호가 틀렸습니다.', 401);
        return next(error);
    }

    const comparePassword = await bcrypt.compare(password, existUser[0][0].password);
    if (!comparePassword) {
        // 비밀번호가 일치하지 않는다면,
        const error = new HttpError('아이디 또는 비밀번호가 틀렸습니다.', 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: existUser[0][0].id,
            },
            process.env.SECRET_KEY
        );
    } catch (err) {
        const error = new HttpError('로그인 실패', 500);
        return next(error);
    }
    res.status(200).json({
        userId: existUser[0][0].id,
        token: token,
    });
};
