import React from "react";
import "./MessageDialog.css";

export const MessageReceiver = props => {
    let time = new Date(props.date);
    let month = time.toLocaleString('en', { month: 'short'});
    let day = time.toLocaleString('en', { day: '2-digit'});
    let weekday = time.toLocaleString('en', { weekday: 'short'});
    let hours = time.toLocaleString('en', { hour: '2-digit', minute: "numeric"});
    return (
        <div className="dialog_message_receiver_box">
            <img src={props.avatar} alt="avatar" className="avatar"></img>
            <div className="dialog_message_receiver">
                <p className="message">
                    {props.message}
                </p>
                <span className="time">{weekday}, {month} {day}, {hours}</span>
            </div>
        </div>
    )
}
export const MessageSender = props => {
    let time = new Date(props.date);
    let month = time.toLocaleString('en', { month: 'short'});
    let day = time.toLocaleString('en', { day: '2-digit'});
    let weekday = time.toLocaleString('en', { weekday: 'short'});
    let hours = time.toLocaleString('en', { hour: '2-digit', minute: "numeric"});
    return (
        <div className="dialog_message_sender_box">     
            <div className="dialog_message_sender">
                <p className="message">
                    {props.message}
                </p>
                <span className="time">{weekday}, {month} {day}, {hours}</span>
            </div>
        </div>
    )
}