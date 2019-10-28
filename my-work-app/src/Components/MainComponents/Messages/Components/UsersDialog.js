import React from "react";
import "./UsersDialog.css";
import { Link } from 'react-router-dom';

const UsersDialog = props => {
    let time;
    let weekday;
    let hours;
    if(props.messages.length !== 0) {
        time = new Date(props.messages[0].created);
        weekday = time.toLocaleString('en', { weekday: 'short'});
        hours = time.toLocaleString('en', { hour: '2-digit', minute: "numeric"});
    }
    return (
        <div className="user_dialog_box" onClick={() => props.getDialog(props._id)}>
            <div className="user_dialog_info">
                <Link to={`/user/${props.participants._id}`}>
                    <img src={props.participants.info.avatar} alt="avatar" className="user_dialog_avatar"></img>
                </Link>
                <div className="user_dialog_data">
                    <p className="name">{props.participants.info.name}</p>
                    <p className="last_message">{props.messages.length !== 0 ? props.messages[0].message : ""}</p>
                </div>
            </div>
            <p className="user_dialog_message_time">
                {time ? (
                    weekday, hours
                ) : ("")}
            </p>
        </div>
    )
}

export default UsersDialog;