require('dotenv').config();
const express = require('express');
const path = require('path');

// 관리자 페이지 관련
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const { Adapter } = require('adminjs-sql');
const session = require('express-session');
const mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const postRoutes = require('./routes/post-routes');
const userRoutes = require('./routes/user-routes');
const otherRoutes = require('./routes/other-routes');

const app = express();

app.use(express.static(path.join(__dirname, 'front/build')));

// 관리자 페이지
// 관리자 계정인지 확인
const authenticate = async (email, password) => {
    let existUser;
    try {
        existUser = await User.findUser(email);
    } catch (err) {
        return console.log('존재하지 않는 아이디');
    }
    if (existUser[0][0].user_type !== 1) {
        return console.log('관리자 권한 없음');
    }

    const comparePassword = await bcrypt.compare(password, existUser[0][0].password);
    if (!comparePassword) {
        // 비밀번호가 일치하지 않는다면,
        return console.log('비밀번호 오류');
    }
    const DEFAULT_ADMIN = {
        email: email,
        password: comparePassword,
    };

    return Promise.resolve(DEFAULT_ADMIN);
};

const start = async () => {
    const options = {
        // DB 연결 옵션
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    };

    await AdminJS.registerAdapter(Adapter); // 어댑터 등록

    const db = await Adapter.init('mysql2', options); // init

    const admin = new AdminJS({
        // DB 전체 테이블 가져옴
        databases: [db],
        resources: db.tables(),
    });

    const connection = mysql2.createPool(options);
    const sessionStore = new MySQLStore({}, connection); // 로그인 세션 DB에 저장

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: process.env.SECRET_KEY,
        },
        null,
        {
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            secret: process.env.SECRET_KEY,
            cookie: {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            },
            name: 'adminjs',
        }
    );

    app.use(admin.options.rootPath, adminRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

};
start();
// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

    next();
});

// routes
app.use('/api', userRoutes);
app.use('/api', otherRoutes);
app.use('/api/posts', postRoutes);

app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, 'front/build/index.html'));
});

// 오류처리 미들웨어
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || '알 수 없는 오류가 발생했습니다.' });
});

app.listen(8080);
