import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Count from "./count";
import "../../css/home.css";
import { Link } from "react-router-dom";

function List({ value }) {
    const data = value.read();
    console.log(data);
    return (
        <>
            {data.length ? (
                <>
                    {data.map((v) => (
                        <div key={v.id}>
                            <div className="list" style={{margin: "auto", display: "block", width: "360px"}}>
                                <Link style={{ textDecoration: "none", color: "black" }} to={"/detail/" + v.id}>
                                    <div>
                                        <br />
                                        <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>
                                            <button
                                                style={{
                                                    border: "1px solid gray",
                                                    borderRadius: "5px",
                                                }}>
                                                <FontAwesomeIcon icon="user" />
                                            </button>{" "}
                                            {v.anonymous === 1 ? "익명" : v.nickname}
                                        </h4>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: "20px", paddingLeft: "10px", fontWeight: "bold" }}>
                                            {" "}
                                            {v.title}
                                            <div style={{ color: "gray", float: "right", fontSize: "12px", paddingTop: "5px" }}>
                                                {new Date(v.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'long', timeStyle: 'short' })}
                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ fontSize: "20px", paddingLeft: "10px" }}>
                                                {" "}
                                                {v.content.substr(0, 10)}... {/* 내용 축약 시켜서 내보내기 */}
                                                <div style={{ color: "black", float: "right", fontSize: "15px" }}>
                                                    <button style={{ border: "1px solid gray", borderRadius: "5px" }}>
                                                        <FontAwesomeIcon icon="thumbs-up" />
                                                        {v.like_count === null ? 0 : v.like_count}
                                                    </button>{" "}
                                                    <button style={{ border: "1px solid gray", borderRadius: "5px" }}>
                                                        <FontAwesomeIcon icon="comment" />
                                                        {v.reply_count === null ? 0 : v.reply_count}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div>검색 결과가 없습니다</div>
            )}
        </>
    );
}

export default List;

/*홈 페이지에 있는 리스트 형태의 글을 컴포넌트로 다시 수정 할예정*/
