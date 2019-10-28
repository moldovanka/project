import React from "react";
import { connect } from 'react-redux';
import Notification from "./Notification";
import { updateNotifications } from "../../../../../redux/user-reducer";

const NotificationContainer = props => {
    return(
        <Notification 
            {...props}
        />
    )
}
let mapStateToProps = state => {
    return {
        settings: state.userReducer.settings.notifications
    }
}
let mapDispatchToProps = dispatch => {
    return {
        setNotifications: notifications => dispatch(updateNotifications(notifications))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);