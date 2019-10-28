import React from "react";
import { connect } from 'react-redux';
import Privacy from "./Privacy";
import { updatePrivacy } from "../../../../../redux/user-reducer";
import { notificationUpdatePrivacyAC } from "../../../../../redux/notification-reducer";

const PrivacyContainer = props => {
    return (
        <Privacy 
            {...props}
        />
    )
}

let mapStateToProps = state => {
    return {
        settings: state.userReducer.settings.privacy,
        notification: state.notificationReducer.privacy
    }
}
let mapDispatchToProps = dispatch => {
    return {
        updatePrivacy: privacy => dispatch(updatePrivacy(privacy)),
        setNotification: notification => dispatch(notificationUpdatePrivacyAC(notification))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyContainer);