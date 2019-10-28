import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import { connect } from 'react-redux';
import Preloader from "../../../Preloader";
import { Redirect } from 'react-router-dom';
import { userAPI } from "../../../api/api";

const UserInfoContainer = props => {
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    useEffect(() => {
        userAPI.getUserData(props.match.params.id)
            .then(res => {
                if(res.data.status === 200) {
                    setUser(res.data.user);
                }
            })
    }, [])
    return(
        <section>
            {props.currentUser._id === props.match.params.id && <Redirect to="/dashboard" />} 
            {user ? (
                <UserInfo
                    user={user}
                    {...props}
                />
            ) : (
                <Preloader />
            )}
        </section>
    )
}

let mapStateToProps = state => {
    return {
        currentUser: state.userReducer,
    }
}

export default connect(mapStateToProps, {})(UserInfoContainer);