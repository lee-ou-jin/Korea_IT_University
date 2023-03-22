
import React, { useState,useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Noti(props) {	
    
    const [showNotification, setShowNotification] = useState(false);
    const name1 = props.value;
    console.log(name1);

	useEffect(() => {
	  setShowNotification(true);
	}, []);
  
	const handleButtonClick = () => {
	  NotificationManager.info('알림이 등록되었습니다!',name1, 3000);
	}
    console.log(props);

    return(
        <>
        <button className="licensebutton"onClick={handleButtonClick}>알림신청</button>
        {showNotification && <NotificationContainer />}
        </>
    )
}
export default Noti;