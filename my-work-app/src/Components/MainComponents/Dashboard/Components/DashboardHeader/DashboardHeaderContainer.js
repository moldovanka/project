import React, {useState, useEffect} from "react";
import DashboardHeader from "./DashboardHeader";
import { connect } from 'react-redux';
import { imageAPI } from './../../../../../api/api';
import { setUserAvatar } from "../../../../../redux/user-reducer";
import { openDialog } from "../../../../../redux/dialog-reducer";
import { Redirect } from 'react-router-dom';

const DashboardHeaderContainer = props => {
    const [image, setImage] = useState(undefined);
    useEffect(() => {
        if(image) {
            imageAPI.uploadImage(image)
            .then(res => {
                props.setUserAvatar(res.data.data.thumb.url);
            })
        }
    }, [image])
    return(
        <>
            {props.openDialog && <Redirect to="/messages" />}
            <DashboardHeader 
                {...props}
                setAvatar={setImage}
            />
        </>
    )
}
let mapStateToProps = state => {
    return {
        openDialog: state.dialogReducer.openDialog
    }
}
let mapDispatchToProps = dispatch => {
    return {
        setUserAvatar: avatar => dispatch(setUserAvatar(avatar)),
        createDialog: target => dispatch(openDialog(target))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderContainer);