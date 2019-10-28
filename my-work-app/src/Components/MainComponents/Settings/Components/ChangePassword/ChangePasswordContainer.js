import React from "react";
import { connect } from 'react-redux';
import ChangePassword from "./ChangePassword";
import { notificationUpdatePasswordAC } from "../../../../../redux/notification-reducer";
import { updatePassword } from "../../../../../redux/user-reducer";

const ChangePasswordContainer = props => {
    return (
        <ChangePassword 
            {...props}
        />
    )
}
let mapStateToProps = state => {
    return {
        notification: state.notificationReducer.changePassword
    }
}
let mapDispatchToProps = dispatch => {
    return {
        setNotification: notification => dispatch(notificationUpdatePasswordAC(notification)),
        changePassword: (oldPassword, newPassword) => dispatch(updatePassword(oldPassword, newPassword))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer);