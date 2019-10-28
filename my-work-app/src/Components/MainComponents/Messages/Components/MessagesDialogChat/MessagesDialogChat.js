import React, {useEffect} from "react";
import "./MessagesDialogChat.css";
import { Formik } from 'formik';
import { MessageReceiver, MessageSender } from './../MessageDialog';


const MessagesDialogChat = props => {
    const messageArea = React.useCallback(node => {
        if(node !== null) {
            node.scrollTop = node.scrollHeight;
        }
    })
    return (
        <div className="dialog_chat_box ">
            <div className="dialog_chat_header">
                <img src={props.dialog.participants.info.avatar} alt="avatar" className="avatar"></img>
                <div className="dialog_chat_header_info">
                    <p className="name">{props.dialog.participants.info.name}</p>
                    <p className="status">{props.dialog.participants.status ? "Online" : "Offline"}</p>
                </div>
            </div>
            <div className="dialog_chat_body" ref={messageArea}>
            {props.dialog.messages.map(message => {
                return (
                    <React.Fragment key={message._id}>
                        {props.currentUser === message.user ? (
                            <MessageSender 
                                message={message.message}
                                date={message.created}
                            />
                        ) : (
                            <MessageReceiver 
                                message={message.message}
                                avatar={props.dialog.participants.info.avatar}
                                date={message.created}
                            />
                        )}
                    </React.Fragment>
                )}
            )}
            </div>
            <div className="dialog_chat_footer">
                <Formik
                    initialValues={{
                        message: ""
                    }}
                    onSubmit={(values, actions) => {
                        props.sendMessage(props.dialog._id, values.message);
                        actions.resetForm();
                    }}
                    render={propsForm => (
                        <form className="dialog_chat_form" onSubmit={propsForm.handleSubmit}>
                            <input
                                type="text"
                                name="message"
                                placeholder="Type a message here"
                                value={propsForm.values.message}
                                onChange={propsForm.handleChange}
                            />
                            <button type="submit">Send</button>
                        </form>
                    )}
                >
                </Formik>
            </div>
        </div>
    )
}


export default MessagesDialogChat;