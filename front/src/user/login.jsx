import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useRecoilState } from 'recoil';
import { tokenState } from '../token/GlobalState';
import ErrorMessage from '../pages/home/Components/error';

function Login({ setToken }) {
    const navigate = useNavigate();
    const [error, setError] = useState([]);

    // const [tokenData, setTokenData] = useState('');
    // const [token, setToken] = useRecoilState(tokenState);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const id = e.target.id.value;
            const password = e.target.password.value;
            const res = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    password,
                }),
            });
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.message);
            }

            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
            setToken(resData.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const OtherMethods = (props) => (
        <div className="alternativeLogin">
            <label>
                <Link style={{ fontSize: '18px' }} to="/signUp" className="link">
                    회원이 아니신가요?
                </Link>
            </label>
            <br />
            <button className="button">로그인</button>
        </div>
    );

    return (
        <div className="loginy">
            <img style={{ width: '300px', height: '270px' }} alt="bg" src="img/hanta-Logo.png" />
            <form onSubmit={onSubmitHandler}>
                <input className="input" style={{ fontSize: '20px' }} description="id" placeholder=" 아이디" type="text" name="id" />
                <br />
                <input className="input" style={{ fontSize: '20px' }} description="Password" placeholder=" 비밀번호" type="password" name="password" />
                {error.length !== 0 ? <ErrorMessage error={error} /> : null}

                <OtherMethods />
            </form>
        </div>
    );
}
export default Login;

// css추가 부가기능추가
