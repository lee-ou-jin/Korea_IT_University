import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../css/write.css';

function WriteNote() {
    const id = 5656; // 해당 글쓴이 아이디로 수정해야 함
    const onSubmitHandler = (e) => {
        const content = e.target.content.value;
        fetch('http://localhost:8080/api/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id,
                content,
            }),
        });
    };
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div style={{ margin:"0 auto", display:"block", width:"340px" }}>
                    <h1>
                        <button style={{border:"none", backgroundColor:"white"}}><FontAwesomeIcon icon="arrow-left" /></button>
                        <button className="buttons">보내기</button>
                    </h1>
                </div>
                <div className="Write">
                    <div>
                        <textarea id="content_txt" placeholder="글을 작성해보세요." maxLength={450} name="content" />
                    </div>
                </div>
            </form>
        </>
    );
}

export default WriteNote;
