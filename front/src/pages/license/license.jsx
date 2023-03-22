import React, { Suspense } from "react";
import Licensecard from "./licensecard";
import "../css/license.css";

function fetchlicense() {
    let license;
    const suspender = fetch("http://localhost:8080/api/license", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const obj = data.reduce((acc, val) => {
                if (!acc?.[val.major]) {
                    acc[val.major] = [];
                }
                acc[val.major].push(val);
                return acc;
            }, {});
            const majorArr = Object.keys(obj);
            license = majorArr.map((major) => obj[major]);
        });
    // {컴공: [...], 요리사: [..]}
    return {
        read() {
            if (!license) {
                throw suspender;
            } else {
                return license;
            }
        },
    };
}

function License() {
    return (
        <>
            <div>
                <h1 style={{ fontSize: "35px", margin: "0 auto", display: "block", width: "360px" }}>자격증 알리미</h1>
            </div>
            <br />
            <div style={{ margin: "0 auto", display: "block", width: "380px", height:"1000px" }}>
                <Suspense fallback={<div style={{textAlign:"center"}}>... 로딩</div>}>
                    <Licensecard value={fetchlicense()}></Licensecard>
                </Suspense>
            </div>
        </>
    );
}

export default License;
