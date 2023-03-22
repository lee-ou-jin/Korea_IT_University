import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Suspense, useEffect, useState } from 'react';
import { useReducer } from 'react';
import List from './Components/list';
import { useLocation } from 'react-router-dom';

function fetchPost() {
    let post;
    const suspender = fetch('http://localhost:8080/api/posts/', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            post = data;
        });
    return {
        read() {
            if (!post) {
                throw suspender;
            } else {
                return post;
            }
        },
    };
}
function fetchPost1() {
    let post;
    const suspender = fetch('http://localhost:8080/api/posts/popular', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            post = data;
        });
    return {
        read() {
            if (!post) {
                throw suspender;
            } else {
                return post;
            }
        },
    };
}
function fetchSearch(search) {
    let post;
    const suspender = fetch(`http://localhost:8080/api/posts/search?result=${search}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            post = data;
        });
    return {
        read() {
            if (!post) {
                throw suspender;
            } else {
                return post;
            }
        },
    };
}
function BoardList() {
    const [search, setSearch] = useState('');
    const [pop, setPop] = useState(0);
    const location = useLocation();
    const title = location.state.props;

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <div style={{ margin: "auto", display: "block", width: "360px" }}>
                <h1 style={{fontSize:"35px"}}>{title}게시판</h1> {/*게시판 종류를 Link로 받아옴 함수로 넣어줄것*/}
            </div>
            <div style={{ margin: "0 auto", display: "block", width: "360px" }}>
                <div>
                    {pop === 0 ? (
                        <button
                            style={{
                                fontSize: "20px",
                                borderRadius: "10px",
                                borderColor: "gray",
                                backgroundColor: "lightgrey",
                            }}
                            onClick={() => {
                                setPop(1);
                            }}>
                            인기글
                        </button>
                    ) : (
                        <button
                            style={{
                                fontSize: "20px",
                                borderRadius: "10px",
                                borderColor: "grey",
                                backgroundColor: "white",
                            }}
                            onClick={() => {
                                setPop(0);
                            }}>
                            최신글
                        </button>
                    )}

                    <input
                        style={{ borderRadius: "10px", margin: "3px", width: "250px", height: "35px", border:"1px solid gray" }}
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={handleChange}></input>
                    <button style={{ border: "none", backgroundColor: "white", fontSize: "20px" }}>
                        <FontAwesomeIcon icon="magnifying-glass" />
                    </button>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <Suspense fallback={<div style={{marginTop:"40px"}}>... 로딩</div>}>
                    {search === "" ? <List value={pop === 0 ? fetchPost() : fetchPost1()}></List> : <List value={fetchSearch(search)}></List>}
                </Suspense>
            </div>
        </>
    );
}

export default BoardList;
