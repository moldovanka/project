import React, {useEffect, useState} from "react";
import UsersDialog from "./UsersDialog";
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { dialogAPI } from './../../../../api/api';
import { SERVER_URL } from "../../../../assets/Server_URL";

const UsersDialogContainer = props => {
    const [messages, setMessages] = useState(props.messages)
    const socket = openSocket(SERVER_URL);
    useEffect(() => {
        socket.on(props._id, () => {
            dialogAPI.updateUserDialog(props._id)
                .then(res => {
                    setMessages(res.data.dialogs.messages);
                })
        })
        return () => {
            socket.off(props._id)
        }
    }, [])
    return (
        <UsersDialog 
            {...props}
            messages={messages}
        />
    )
}
export default connect(null, {})(UsersDialogContainer)