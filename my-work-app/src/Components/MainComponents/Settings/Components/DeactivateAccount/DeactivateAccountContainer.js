import React from "react";
import DeactivateAccount from "./DeactivateAccount";
import { connect } from 'react-redux';
import { deactivateAccount } from "../../../../../redux/user-reducer";
import { notificationDeactivateAccountAC } from "../../../../../redux/notification-reducer";


const DeactivateAccountContainer = props => {
    return (
        <DeactivateAccount 
            {...props}
        />
    )
}
let mapStateToProps = state => {
    return {
        notification: state.notificationReducer.deactivateAccount
    }
}
let mapDispatchToProps = dispatch => {
    return {
        deactivateAccount: password => dispatch(deactivateAccount(password)),
        setNotification: notification => dispatch(notificationDeactivateAccountAC(notification))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeactivateAccountContainer);