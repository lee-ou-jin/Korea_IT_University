import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../css/write.css";
import ErrorMessage from "../home/Components/error";
import { Link, useNavigate } from "react-router-dom";

function Write() {
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;
        const post_type = e.target.post_type.value; //라디오 버튼으로 게시판 추가하기
        const anonymous = isChecked;
        const userId = localStorage.getItem("userId");

        try {
            const response = await fetch("http://localhost:8080/api/posts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    title,
                    content,
                    userId,
                    post_type,
                    anonymous,
                }),
            });
            const data = await response.json();
            navigate("/");

            if (!response.ok) {
                throw new Error(data.message);
            }
        } catch (err) {
            setError(err.message || "알 수 없는 에러가 발생했습니다.");
        }
    };
    const handleChange = (event) => {
        setIsChecked(event.target.checked);
    };
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div style={{ margin: "0 auto", display: "block", width: "340px" }}>
                    <h1>
                        <button style={{ border: "none", backgroundColor: "white" }}>
                            <FontAwesomeIcon icon="arrow-left" />
                        </button>

                        <button className="buttons">올리기</button>

                        <box className="buttons">
                            익명 <input type="checkbox" checked={isChecked} onChange={handleChange} name="anonymous"></input>
                        </box>

                        <select className="select" name="post_type" id="post_type">
                            <option value="자유">자유</option>
                            <option value="비밀">비밀</option>
                            <option value="공부">공부</option>
                        </select>
                    </h1>
                </div>
                {error.length !== 0 ? <ErrorMessage error={error} /> : null}

                <div className="Write">
                    <div className="title">
                        <input type="title" id="title_txt" placeholder="제목" name="title" />
                    </div>

                    <div>
                        <textarea id="content_txt" placeholder="글을 작성해보세요" maxLength={450} name="content" />
                    </div>
                </div>
            </form>
        </>
    );
}

export default Write;
