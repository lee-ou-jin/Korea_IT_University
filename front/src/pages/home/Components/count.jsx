import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import "../../css/home.css";
import ButtonFetch from "./buttonFetch";

function Count(props) {
    const [hel,setHel] = useState(0);
    return (
        <div style={{ float: "right" }}>
            <span>
                <button style={{fontSize: "15px", border: "1px solid gray", borderRadius: "5px"}}
                    onClick={() => setHel(hel === 0 ? 1 : 0)}>
                    <FontAwesomeIcon icon="thumbs-up" />
                    {props.value.likes === null ?  hel : props.value.likes + hel }
                </button>
            </span>
            
            &nbsp;
            <button style={{fontSize: "15px", border: "1px solid gray", borderRadius: "5px"}}>
                <FontAwesomeIcon icon="comment" />
                {props.value.reply === null ? 0 : props.value.reply}
            </button>
        </div>
    );
}

export default Count;
