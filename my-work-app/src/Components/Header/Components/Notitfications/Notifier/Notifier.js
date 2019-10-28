import React from "react";
import "./Notifier.css";
import { Link } from "react-router-dom";

const Notifier = props => {
    return(
        <div className="notifier_box">
            {props.notification.map(notification => {
                let millisec = Date.now() - new Date(notification.messages.created);
                let minutes = (millisec / (1000 * 60)).toFixed(0);
                return(
                    <div className="notifier_message" key={notification._id}>
                        <Link to={`/user/${notification.user._id}`} onClick={() => props.setIsOpen(false)} className="notifier_message_link">
                            <img src={notification.user.info.avatar} alt="avatar" className="notifier_message_avatar"></img>
                        </Link>
                        <div className="notifier_message_info">
                            <h3>{notification.user.info.name}</h3>
                            <Link to={notification.messages.link} onClick={() => props.setIsOpen(false)}>{notification.messages.message}</Link>
                            <p>{minutes} min ago</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Notifier;