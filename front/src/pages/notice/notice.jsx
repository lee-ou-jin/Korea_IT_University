import Noticecp from "./noticecp";
import React, { Suspense, useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function fetchPost1() {
    let post;
    const suspender = fetch("http://localhost:8080/api/notice/license", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            post = data;
            console.log(post);
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

function fetchPost2() {
    let post;
    const suspender = fetch("http://localhost:8080/api/notice/reply", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            post = data;
            console.log(post);
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

function Notice() {
    const [showNotification, setShowNotification] = useState(false);
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        setShowNotification(true);
    }, []);

    const handleButtonClick = () => {
        NotificationManager.info("삭제되었습니다", "알림", 3000);
        setShowContent(false);
    };

    return (
        <>
            <div style={{ margin: "auto", display: "block", width: "360px" }}>
                <h1 style={{ fontSize: "35px" }}>알림
                <button className="buttons" onClick={handleButtonClick}>알림삭제</button>
                </h1>
                <br/>
            {showNotification && <NotificationContainer />}
            {showContent && (
                <div style={{margin: "auto", display: "block", width: "360px", textAlign:"center"}}>
                <Suspense fallback={<>... 로딩</>}>
                    <Noticecp value={fetchPost1()}></Noticecp>
                    <Noticecp value={fetchPost2()}></Noticecp>
                </Suspense>
                </div>
            )}<br/>
            {!showContent && <div style={{textAlign:"center"}}>알림이 없습니다.</div>}
            </div>
        </>
    );
}

export default Notice;
