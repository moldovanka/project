import React, {useEffect} from "react";
import { connect } from 'react-redux';
import NotitficationMessages from "./NotitficationMessages";
import { getMessagesNotifications, getNotificationsMessages, readNotificationsMessages } from "../../../../../redux/notification-reducer";
import openSocket from 'socket.io-client';
import { SERVER_URL } from "../../../../../assets/Server_URL";

const NotitficationMessagesContainer = props => {
    const socket = openSocket(SERVER_URL);
    useEffect(() => {
        props.getNotifications()
    }, [])
    useEffect(() => {
        socket.on(`messages_notifications:${props.userID}`, () => {
            props.getNotifications()
        })
        return () => {
            socket.off(`messages_notifications:${props.userID}`)
        }
    })
    return (
        <NotitficationMessages 
            notification={props.notification}
            clearNotitifications={props.clearNotitifications}
        />
    )
}

let mapStateToProps = state => {
    return {
        notification: getMessagesNotifications(state),
        userID: state.userReducer._id
    }
}
let masDispatchToProps = dispatch => {
    return {
        getNotifications: () => dispatch(getNotificationsMessages()),
        clearNotitifications: () => dispatch(readNotificationsMessages()),
    }
}

export default connect(mapStateToProps, masDispatchToProps)(NotitficationMessagesContainer);