import { otherAPI } from "../api/api";

///////////////////////////////////////
const NOTIFICATION_MESSAGES_SET = "NOTIFICATION_MESSAGES_SET";
const NOTIFICATION_MESSAGES_CLEAR = "NOTIFICATION_MESSAGES_CLEAR";
const NOTIFICATION_EVENTS_SET = "NOTIFICATION_EVENTS_SET";
const NOTIFICATION_EVENTS_CLEAR = "NOTIFICATION_EVENTS_CLEAR";
const NOTIFICATION_UPDATE_PROFILE = "NOTIFICATION_UPDATE_PROFILE";
const NOTIFICATION_UPDATE_PRIVACY = "NOTIFICATION_UPDATE_PRIVACY";
const NOTIFICATION_UPDATE_PASSWORD = "NOTIFICATION_UPDATE_PASSWORD";
const NOTIFICATION_DEACTIVATE_ACCOUNT = "NOTIFICATION_DEACTIVATE_ACCOUNT";


let initialstate = {
    messages: {
        notifications: [],
        unread: undefined
    },
    events: {
        notifications: [],
        unread: undefined
    },
    privacy: "",
    changePassword: "",
    profileUpdate: undefined,
    deactivateAccount: ""
}


const notificationReducer = (state = initialstate, action) => {
    switch(action.type) {
        case NOTIFICATION_MESSAGES_SET: {
            return {
                ...state,
                messages: {
                    notifications: [...action.messages.notifications],
                    unread: action.messages.unread
                },
            }
        }
        case NOTIFICATION_MESSAGES_CLEAR: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    unread: 0
                },
            }
        }
        case NOTIFICATION_EVENTS_SET: {
            return {
                ...state,
                events: {
                    notifications: [...action.events.notifications.reverse()],
                    unread: action.events.unread
                },
            }
        }
        case NOTIFICATION_EVENTS_CLEAR: {
            return {
                ...state,
                events: {
                    ...state.events,
                    unread: 0
                },
            }
        }
        case NOTIFICATION_UPDATE_PROFILE: {
            return {
                ...state,
                profileUpdate: action.profile
            }
        }
        case NOTIFICATION_UPDATE_PRIVACY: {
            return {
                ...state,
                privacy: action.privacy
            }
        }
        case NOTIFICATION_UPDATE_PASSWORD: {
            return {
                ...state,
                changePassword: action.changePassword
            }
        }
        case NOTIFICATION_DEACTIVATE_ACCOUNT: {
            return {
                ...state,
                deactivateAccount: action.deactivateAccount
            }
        }
        default:
            return state; 
    }
}
// ACTIONS CREATOR
export const notificationMessagesSetAC = messages => ({type: NOTIFICATION_MESSAGES_SET, messages})
export const notificationMessagesClear = () => ({type: NOTIFICATION_MESSAGES_CLEAR})
export const notificationEventsSetAC = events => ({type: NOTIFICATION_EVENTS_SET, events})
export const notificationEventsClear = () => ({type: NOTIFICATION_EVENTS_CLEAR})
export const notificationUpdateProfileAC = profile => ({type: NOTIFICATION_UPDATE_PROFILE, profile});
export const notificationUpdatePrivacyAC = privacy => ({type: NOTIFICATION_UPDATE_PRIVACY, privacy});
export const notificationUpdatePasswordAC = changePassword => ({type: NOTIFICATION_UPDATE_PASSWORD, changePassword});
export const notificationDeactivateAccountAC = deactivateAccount => ({type: NOTIFICATION_DEACTIVATE_ACCOUNT, deactivateAccount});
// THUNKS
export const getNotificationsEvents = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    otherAPI.getNotificationsEvents(user._id)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(notificationEventsSetAC(response.data.notifications.events))
            }
        })
}
export const readNotificationsEvents = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    otherAPI.readNotificationsEvents(user._id)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(notificationEventsClear())
            }
        })
}
export const getNotificationsMessages = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    otherAPI.getNotificationsMessages(user._id)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(notificationMessagesSetAC(response.data.notifications.messages))
            }
        })
}
export const readNotificationsMessages = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    otherAPI.readNotificationsMessages(user._id)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(notificationMessagesClear())
            }
        })
}
// SELECTORS
export const getMessagesNotifications = state => {
    return state.notificationReducer.messages;
}
export const getEventsNotifications = state => {
    return state.notificationReducer.events;
}
export const getProfileUpdateNotification = state => {
    return state.notificationReducer.profileUpdate;
}

export default notificationReducer;