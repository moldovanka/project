import React, {useState, useEffect} from "react";
import "./../Notifications.css";
import { Badge, makeStyles } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Notifier from "../Notifier/Notifier";

const useNotitficationMessagesStyles = makeStyles(theme => ({
    badge_color: {
        color: "#fff",
        background: "#fa2276"
    },
}))

const NotificationEvents = props => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useNotitficationMessagesStyles();
    useEffect(() => {
        document.addEventListener("click", handleClickOutSide, false)
        function handleClickOutSide(e) {
            const block = document.getElementById("badge_notification_events");
            if(!e.path.includes(block)) {
                setIsOpen(false)
            }
        }
        return () => {
            document.removeEventListener("click", handleClickOutSide, false)
        }
    })
    const toggleOpen = e => {
        if(props.notification.length !== 0) {
            if(!isOpen) {
                setIsOpen(true);
                props.clearNotitifications();
            } else {
                setIsOpen(false);
            }
        }
    }
    return (
        <>
            <Badge 
                badgeContent={props.notification.unread}
                color="primary"
                classes={{
                    colorPrimary: classes.badge_color
                }}
                className="badge_notification"
                id="badge_notification_events"
                onClick={toggleOpen}
                >
                   <NotificationsIcon className="badge_notification_icon" />
            </Badge>
            {isOpen && 
            <Notifier 
                notification={props.notification.notifications}
                setIsOpen={setIsOpen}
            />}
        </>
    )
}

export default NotificationEvents;