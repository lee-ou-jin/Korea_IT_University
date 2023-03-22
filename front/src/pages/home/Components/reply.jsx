import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Report from "./dropdown";
import "./reply.css";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function Reply({reply, setReply}) {
    const [showReply, setShowReply] = useState(reply.map(() => false));
    const params = useParams();
    const [error, setError] = useState([]);
	const groupIds = reply.map((data) => data.group_id);
	console.log(groupIds);

    const handleReplyClick = (index) => () =>
        setShowReply((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });

   
		
	const onSubmitHandler = async (e, groupId) => {
		e.preventDefault();

		const content = e.target.content.value;
		const anonymous = true;
		const userId = localStorage.getItem("userId");
		const group_id = groupId;

		try {
			const response = await fetch(`http://localhost:8080/api/posts/${params.id}/reply2`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				body: JSON.stringify({
					content,
					userId,
					anonymous,
					group_id,
				}),
			});
			const data = await response.json();
            setReply()
            if (!response.ok) {
				throw new Error(data.message);
			}
		} catch (err) {
			setError(err.message || "알 수 없는 에러가 발생했습니다.");
		}
	};

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        setShowNotification(true);
    }, []);

    const handleButtonClick = () => {
        NotificationManager.info("신고되었습니다", "댓글", 3000);
    };

    return (
        <>
            <div>
                {reply?.map((reply, idx) => (
                    <div style={{ margin: "15px" }} key={idx}>
                        <div style={{ fontSize: "18px" }} className={reply.layer ? "reply" : "reply_reply"}>
                            <h4 style={{ fontSize: "18px" }}>
                                <button style={{ border: "1px solid gray", borderRadius: "5px" }}>
                                    <FontAwesomeIcon icon="user" />
                                </button>{" "}
                                {reply.anonymous === 1 ? "익명" : reply.nickname}
                            </h4>
                            <h4 style={{ fontSize: "18px" }}>{reply.content}</h4>
                            <a style={{ color: "gray", float: "right", fontSize: "12px", paddingTop: "12px" }}>
                                {new Date(reply.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'long', timeStyle: 'short' })}
                            </a>
                            {reply.layer ? (
                                <></>
                            ) : (
                                <button
                                    style={{
                                        fontSize: "15px",
                                        border: "solid 1px #ababab",
                                        borderRadius: "5px",
                                    }}
                                    onClick={handleReplyClick(idx)}>
                                    답글
                                </button>
                            )}{" "}
                            {showReply[idx] && (
                                <form onSubmit={(e) => onSubmitHandler(e, groupIds[idx])}>
                                    <input
                                        style={{ borderRadius: "5px", width: "150px", height: "25px", border: "1px solid gray", marginTop: "5px" }}
                                        type="text" maxLength={20} name="content"
                                    />{" "}
                                    <button style={{ fontSize: "15px", border: "solid 1px #ababab", borderRadius: "5px" }} type="submit">
                                        작성
                                    </button>
                                </form>
                            )}
                            <button
                                style={{
                                    fontSize: "15px",
                                    border: "solid 1px #ababab",
                                    borderRadius: "5px",
                                    color:"red"
                                }}
                                onClick={handleButtonClick}>
                                신고
                            </button>
                            {showNotification && <NotificationContainer />}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Reply;
