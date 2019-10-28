import React from "react";
import { connect } from 'react-redux';
import UserHeaderPanel from "./UserHeaderPanel";
import { userLogOut } from "../../../../redux/auth-reducer";

const UserHeaderPanelContainer = props => {
    return (
        <UserHeaderPanel 
            userName={props.userName}
            logOut={props.logOut}
        />
    )
}

let mapStateToProps = state => {
    return {
        userName: state.userReducer.info.name,
    }
}
let mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(userLogOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeaderPanelContainer)