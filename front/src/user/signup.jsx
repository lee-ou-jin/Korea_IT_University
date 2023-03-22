import React, { useState } from "react";
import ErrorMessage from "../pages/home/Components/error";
import "./signup.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const id = e.target.id.value;
        const nickname = e.target.nickname.value;
        const password = e.target.password.value;
        const major = e.target.major.value;

        try {
            const response = await fetch("http://localhost:8080/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    nickname,
                    password,
                    major,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            console.log("로그인 성공");
            navigate("/login");
        } catch (err) {
            setError(err.message || "알 수 없는 에러가 발생했습니다.");
        }
    };
    return (
        <>
            <Card className="fuck" style={{ width: "350px", height: "550px" }}>
                <ListGroup variant="flush">
                    <form onSubmit={onSubmitHandler}>
                        <div className="inputking">
                            <img style={{ width: "270px", height: "200px" }} alt="intro" src="img/signup 2.png" />
                            {error.length !== 0 ? <ErrorMessage error={error} /> : null}
                            <input className="input" style={{ fontSize: "20px" }} type="text" id="title_txt" placeholder=" 아이디" name="id" />
                            <input className="input" style={{ fontSize: "20px" }} type="text" id="title_txt" placeholder=" 닉네임" name="nickname" />
                            <input className="input" style={{ fontSize: "20px" }} type="password" id="title_txt" placeholder=" 비밀번호" name="password" />
                            {/* <input className="input" type="password" id="title_txt" placeholder=" 비밀번호 확인" name="password" /> */}
                                <select className="input" style={{ fontSize: "20px" }} id="title_txt" placeholder=" 전공학과" name="major">
                                    <option value="인공지능">인공지능</option>
                                    <option value="인공지능">게임</option>
                                    <option value="정보보안">정보보안</option>
                                    <option value="디자인">디자인</option>
                                </select>
                            <button className="button">회원가입</button>
                        </div>
                    </form>
                </ListGroup>
            </Card>
        </>
    );
}

export default SignUp;
