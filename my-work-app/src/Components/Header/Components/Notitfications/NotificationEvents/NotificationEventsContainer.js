import React, {useEffect} from "react";
import { connect } from 'react-redux';
import NotificationEvents from './NotificationEvents';
import { getEventsNotifications, getNotificationsEvents } from "../../../../../redux/notification-reducer";
import { readNotificationsEvents } from './../../../../../redux/notification-reducer';
import openSocket from 'socket.io-client';
import { SERVER_URL } from "../../../../../assets/Server_URL";

const NotificationEventsContainer = props => {
    const socket = openSocket(SERVER_URL);
    useEffect(() => {
        props.getNotifications()
    }, [])
    useEffect(() => {
        socket.on(`events_notifications:${props.userID}`, () => {
            props.getNotifications()
        })
        return () => {
            socket.off(`events_notifications:${props.userID}`)
        }
    })
    return (
        <NotificationEvents 
            notification={props.notification}
            clearNotitifications={props.clearNotitifications}
        />
    )
}

let mapStateToProps = state => {
    return {
        notification: getEventsNotifications(state),
        userID: state.userReducer._id
    }
}
let masDispatchToProps = dispatch => {
    return {
        getNotifications: () => dispatch(getNotificationsEvents()),
        clearNotitifications: () => dispatch(readNotificationsEvents()),
    }
}

export default connect(mapStateToProps, masDispatchToProps)(NotificationEventsContainer);