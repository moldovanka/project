import React, {useEffect} from "react";
import Dashboard from "./Dashboard";
import { connect } from 'react-redux';
import { getUserData } from "../../../redux/user-reducer";

const DashboardContainer = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    useEffect(() => {
        if(props.user._id !== "") {
            props.getUserData(props.user._id)
        }
    }, [props.user._id])
    return (
        <Dashboard 
            {...props}
        />
    )
}
let mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}
let mapDispatchToProps = dispatch => {
    return {
        getUserData: user => dispatch(getUserData(user)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);