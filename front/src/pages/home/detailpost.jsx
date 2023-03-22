import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Components/detail';

function fetchDetail(param) {
    let detail;
    const suspender = fetch(`http://localhost:8080/api/posts/${param}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            detail = data;
        });
    return {
        read() {
            if (!detail) {
                throw suspender;
            } else {
                return detail;
            }
        },
    };
}

function Detailpost() {
    const params = useParams();
    return (
        <>
            <Suspense style={{ textAlign: 'center', fontSize: '40px' }} fallback={<>...로딩</>}>
                <Detail value={fetchDetail(params.id)}></Detail>
            </Suspense>
        </>
    );
}

export default Detailpost;
