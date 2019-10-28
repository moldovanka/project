import React from "react";
import ChangeUserDetails from "./ChangeUserDetails";
import { connect } from 'react-redux';
import { profileUserUpdate } from "../../../../../../redux/user-reducer";
import { notificationUpdateProfileAC, getProfileUpdateNotification } from "../../../../../../redux/notification-reducer";

const ChangeUserDetailsContainer = props => {
    return(
        <ChangeUserDetails 
            {...props}
        />
    )
}

let mapStateToProps = state => {
    return {
        name: state.userReducer.info.name,
        about: state.userReducer.info.about,
        address: state.userReducer.info.address,
        phone: state.userReducer.info.phone,
        website: state.userReducer.info.website,
        country: state.userReducer.info.country,
        region: state.userReducer.info.region,
        notification: getProfileUpdateNotification(state)
    }
}

let masDispatchToProps = dispatch => {
    return {
        updateProfile: info => dispatch(profileUserUpdate(info)),
        clearNotification: notification => dispatch(notificationUpdateProfileAC(notification))
    }
}

export default connect(mapStateToProps, masDispatchToProps)(ChangeUserDetailsContainer)