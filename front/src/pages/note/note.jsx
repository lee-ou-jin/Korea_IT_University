import React, { Suspense, useState } from 'react';
import List from '../home/Components/noteList';
import '../css/write.css';

function fetchNote1() {
    let note;
    const suspender = fetch('http://localhost:8080/api/note/receive', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            note = data;
        });
    return {
        read() {
            if (!note) {
                throw suspender;
            } else {
                return note;
            }
        },
    };
}

function fetchNote2() {
    let note;
    const suspender = fetch('http://localhost:8080/api/note/send', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            note = data;
        });
    return {
        read() {
            if (!note) {
                throw suspender;
            } else {
                return note;
            }
        },
    };
}

function Note() {
    const [page, setPage] = useState(0);

    return (
        <>
            <div>
                <h1 style={{ margin:"0 auto", display:"block", width:"360px" }}>쪽지함</h1>
            </div>

            <br />

            <div className="buthon">
                <button
                    className="buthony"
                    onClick={() => {
                        setPage(0);
                    }}
                >
                    받은 쪽지
                </button>
                <button
                    className="buthony"
                    onClick={() => {
                        setPage(1);
                    }}
                >
                    보낸 쪽지
                </button>
            </div>  
            <Suspense fallback={<div style={{margin:"0 auto", display:"block", width:"360px", textAlign:"center"}}>... 로딩</div>}>
                <List value={page === 0 ? fetchNote1() : fetchNote2()}></List>
            </Suspense>
        </>
    );
}

export default Note;
