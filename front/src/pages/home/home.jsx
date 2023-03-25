import React from "react";
import { Link } from "react-router-dom";

function Home() {
    console.log(localStorage);
    return (
        <>
            <div style={{ margin: "0 auto", display: "block", width: "370px" }}>
                <div>
                    <h2 style={{ textAlign: "center", marginLeft: "10px" }}>
                        <img style={{ width: "140px", height: "60px" }} alt="bg" src="img/logo.png" />
                    </h2>

                    <div style={{ margin: "0 auto", display: "block", borderTop: "3px solid gray", borderBottom: "3px solid gray", width: "370px" }}>
                        <Link style={{ margin: "25px", fontSize: "20px" }} to="/boardlist" className="link" state={{ props: "전체" }}>
                            전체
                        </Link>
                        <Link style={{ margin: "25px", fontSize: "20px" }} to="/boardlist" className="link" state={{ props: "자유" }}>
                            자유
                        </Link>
                        <Link style={{ margin: "25px", fontSize: "20px" }} to="/boardlist" className="link" state={{ props: "비밀" }}>
                            비밀
                        </Link>
                        <Link style={{ margin: "25px", fontSize: "20px" }} to="/boardlist" className="link" state={{ props: "공부" }}>
                            공부
                        </Link>
                    </div>
                </div>

                <img style={{ margin: "auto", display: "block", width: "370px", height: "200px" }} alt="" src="img/computer size.png" />

                <div style={{ margin: "0 auto", display: "block", border: "2px solid gray", width: "370px" }}></div>
                <br />

                <div
                    style={{
                        width: "350px",
                        height: "100px",
                        border: "2px solid gray",
                        backgroundColor: "white",
                        margin: "0 auto",
                        display: "block",
                        borderRadius: "30px",
                        marginLeft: "10px",
                    }}>
                    <div style={{ marginLeft: "10px", marginTop: "8px" }}>
                        <img style={{ width: "80px", height: "80px" }} alt="" src="img/jolla.png" />
                        <span style={{ fontSize: "15px", fontFamily: "Noto Sans KR", fontWeight: "bold" }}> 공지사항은 추후 업데이트 예정입니다~</span>
                    </div>
                </div>

                <br />

                <div
                    style={{
                        width: "350px",
                        height: "100px",
                        border: "2px solid gray",
                        backgroundColor: "white",
                        margin: "0 auto",
                        display: "block",
                        borderRadius: "30px",
                        marginLeft: "10px",
                    }}>
                    <div style={{ marginLeft: "10px", marginTop: "8px" }}>
                        <img style={{ width: "80px", height: "80px" }} alt="" src="img/jolla.png" />
                        <span style={{ fontSize: "15px", fontFamily: "Noto Sans KR", fontWeight: "bold" }}> 컨텐츠는 추후 업데이트 예정입니다~</span>
                    </div>
                </div>
                <br />
                <div style={{ textAlign: "center" }}>
                    <button>
                        <Link style={{ textDecoration: "none", color: "black" }} to="practice">
                            연습
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}
export default Home;
