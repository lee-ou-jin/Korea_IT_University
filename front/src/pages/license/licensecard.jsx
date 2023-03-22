import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';   
import React, { useState,useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; 
import Noti from "./notice";



function Licensecard({ value }) {
    const array = value.read()
    return (
        <>
            {
                array.map((v) => {
                    return (
                        <>
                            <h4 className="title">{v[0].major}</h4>
                            <List value={v} />
                        </>
                    )
                })
            }
        </>
    );
}

function List({ value }) {
    return (
        <>
            {
                value.map((val,idx) =>
                <div key={idx}>

                    <Card className="cardo" style={{marginBottom:"10px", marginTop:"10px"}}>
                        <Card.Body>
                            <Card.Title>
                                <div className="name">
                                    {val.name}
                                </div>
                                <Noti value = {val.name}></Noti>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
                )
            }
        </>
    )
}

export default Licensecard;