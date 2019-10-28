import React, {useEffect} from "react";
import MessagesDialogChat from './MessagesDialogChat';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { getSelectDialog, sendMessageDialog, getDialog } from "../../../../../redux/dialog-reducer";
import { SERVER_URL } from "../../../../../assets/Server_URL";


const MessagesDialogChatContainer = props => {
    const socket = openSocket(SERVER_URL);
    useEffect(() => {
        if(props.dialog) {
            props.updateDialog(props.dialog._id);
        }
    }, [])
    useEffect(() => {
        if(props.dialog) {
            socket.on(props.dialog._id, () => {
                props.updateDialog(props.dialog._id)
            })
            return () => {
                socket.off(props.dialog._id)
            }
        }
    }, [props.dialog])
    return (
        <>
            {props.dialog ? (
                <MessagesDialogChat 
                    currentUser={props.currentUser}
                    dialog={props.dialog}
                    sendMessage={props.sendMessage}
                />
            ) : ("")}
        </>
    )
}
let mapStateToProps = state => {
    return {
        dialog: getSelectDialog(state),
    }
}
let mapDispatchToProps = dispatch => {
    return {
        updateDialog: dialog => dispatch(getDialog(dialog)),
        sendMessage: (dialog, message) => dispatch(sendMessageDialog(dialog, message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesDialogChatContainer)