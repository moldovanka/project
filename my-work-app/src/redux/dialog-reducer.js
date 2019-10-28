import { dialogAPI } from "../api/api";

const SET_DIALOGS = "SET_DIALOGS";
const SET_ACTIVE_DIALOG = "SET_ACTIVE_DIALOG";
const OPEN_DIALOG = "OPEN_DIALOG";


let initalState = {
    openDialog: false,
    dialogs: [],
    activeDialog: undefined
}

const dialogReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_DIALOGS: {
            return {
                ...state,
                dialogs: [...action.dialogs]
            }
        }
        case SET_ACTIVE_DIALOG: {
            return {
                ...state,
                activeDialog: action.dialog
            }
        }
        case OPEN_DIALOG: {
            return {
                ...state,
                openDialog: action.openDialog
            }
        }
        default:
            return state;
    }
}
// ACTION CREATORS
export const setDialogsAC = dialogs => ({type: SET_DIALOGS, dialogs})
export const setActiveDialogAC = dialog => ({type: SET_ACTIVE_DIALOG, dialog})
export const openDialogAC = openDialog => ({type: OPEN_DIALOG, openDialog})
// THUNKS
export const openDialog = target => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    dialogAPI.openDialog(user._id, target)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(getDialog(response.data.dialog));
                dispatch(openDialogAC(true));
            }
        })
}
export const getDialogs = search => dispatch => {
    const value = new RegExp(`^${search}`, "gmi");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    dialogAPI.getUserDialog(user._id)
        .then(response => {
            if(response.data.status === 200) {
                const dialogs = response.data.dialogs
                .map(dialog => {
                    const participants = dialog.participants.filter(participant => participant._id !== user._id)
                    dialog.participants = participants[0];
                    return dialog;
                })
                .filter(dialog => value.test(dialog.participants.info.name))
                dispatch(setDialogsAC(dialogs));
            }
        })
}
export const getDialog = dialog => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    dialogAPI.getDialog(dialog)
        .then(response => {
            if(response.data.status === 200) {
                let dialog = response.data.dialog;
                const participants = dialog.participants.filter(participant => participant._id !== user._id)
                dialog.participants = participants[0];
                dispatch(setActiveDialogAC(dialog))
            }
        })
}
export const sendMessageDialog = (dialog, messages) => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    dialogAPI.sendMessage(user._id, dialog, messages)
        .then(response => {
            if(response.data.status === 200) {
                //dispatch(getDialog(response.data.dialog))
            }
        })
}
// SELECTORS
export const getSelectDialog = state => {
    return state.dialogReducer.activeDialog
}


export default dialogReducer;