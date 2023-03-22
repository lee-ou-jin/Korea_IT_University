import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import "../css/home.css"

const Noticecpi = makeStyles()((theme) => ({
    paper: {
      padding: theme.spacing(1),
    },
  }));

const Noticecp = ({value}) => {
    const props = value.read();
    const {classes} = Noticecpi();
    return (<>
        {props.map((v) => (
            <div key={v.index}>            
        <Paper style={{margin:"0 auto", display:"block", width:"360px", height:"70px", backgroundColor:"lightgray", marginTop:"20px", textAlign:"left"}} elevation={4} className={classes.paper}>
        <Typography variant="body1">
        <div className="ct">
                <ul>
                    <li className="bd" style={{fontSize:"15", fontWeight:"bold", paddingTop:"10px"}}>{v.message}</li>
                    <div style={{fontSize:"12px", color:"gray"}}>{new Date(v.send_date).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'long', timeStyle: 'short' })}</div>
                </ul>
            </div>
        </Typography>
        </Paper>
        </div>
    ))}
    </>
    );
}
export default Noticecp;
