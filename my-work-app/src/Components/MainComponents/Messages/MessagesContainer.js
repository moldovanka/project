import React, {useEffect} from "react";
import { connect } from 'react-redux';
import Messages from "./Messages";
import { getDialogs, openDialogAC, searchDialogAC } from "../../../redux/dialog-reducer";


const MessagesContainer = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    useEffect(() => {
        props.getDialogs("")
        props.deactivateOpenDialog(false)
    }, [])
    return(
        <section>
            <Messages 
                currentUser={props.currentUser}
                dialogs={props.dialogs}
                searchDialogs={props.searchDialogs}
            />
        </section>
    )
}

let mapStateToProps = state => {
    return {
        currentUser: state.userReducer._id,
        dialogs: state.dialogReducer.dialogs
    }
}
let masDispatchToProps = dispatch => {
    return {
        getDialogs: search => dispatch(getDialogs(search)),
        deactivateOpenDialog: openDialog => dispatch(openDialogAC(openDialog)),
    }
}
export default connect(mapStateToProps, masDispatchToProps)(MessagesContainer);