import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonFetch from './buttonFetch';
import React, { useState,useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';




function Report(props) {

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
    setShowNotification(true);
    }, []);

    const handleButtonClick = () => {
    NotificationManager.info('신고되었습니다','게시글', 3000);
    }

    return (
        <button style={{border:"none", backgroundColor:"white", float:"right"}}>
        <Dropdown>
            <Dropdown.Toggle variant="">
                <FontAwesomeIcon style={{ fontSize: '35px' }} icon="ellipsis-vertical" />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>
                <Dropdown.Item
                    onClick={() => {
                        ButtonFetch('', props.value.id, 'delete');
                    }}
                    style={{ fontWeight: 'bold' }}
                >
                    삭제
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={handleButtonClick}
                    style={{ fontWeight: 'bold', color:"red" }}
                >    신고
                </Dropdown.Item>
                {showNotification && <NotificationContainer />}
                <Dropdown.Item href="/note" style={{ fontWeight: 'bold' }}>
                    쪽지보내기
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </button>
    );
}

export default Report;
