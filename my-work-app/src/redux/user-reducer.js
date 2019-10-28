import { userAPI } from "../api/api";
import { userLogOut } from "./auth-reducer";
import { notificationUpdateProfileAC, notificationUpdatePrivacyAC, notificationUpdatePasswordAC, notificationDeactivateAccountAC } from "./notification-reducer";

const SET_USER_DATA = "SET_USER_DATA";
const AVATAR_UPDATE = "AVATAR_UPDATE";
const PROFILE_UPDATE = "PROFILE_UPDATE";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const UPDATE_PRIVACY = "UPDATE_PRIVACY";
const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";
const ADD_FAVORITE_LISTING = "ADD_FAVORITE_LISTING";
const REMOVE_FAVORITE_LISTING = "REMOVE_FAVORITE_LISTING";
const REMOVE_LISTINGS = "REMOVE_LISTINGS";

let initialState = {
    _id: "",
    email: "",
    info: {
        avatar: "",
        name: "",
        gender: "",
        about: "",
        address: "",
        phone: "",
        website: "",
        country: "",
        region: "",
        location: {
            lat: "",
            lng: ""
        },
        socials: [],
        listings: [],
        savedListings: [],
        following: [],
        followers: [],
    },
    settings: {
        notifications: {
            listings: false,
            follow: false
        },
        privacy: {
            email: "everyone",
            friends: "everyone"
        }
    },
    posts: [],
    dialogs: [],
}
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {
                ...action.user
            }
        }
        case AVATAR_UPDATE: {
            return {
                ...state,
                info: {
                    ...state.info,
                    avatar: action.avatar
                }
            }
        }
        case PROFILE_UPDATE: {
            return {
                ...state,
                info: {
                    ...state.info,
                    ...action.info,
                    socials: state.info.socials.map(social => {
                        if(action.info.socials) {
                            if(social.social === action.info.socials.social) {
                                return action.info.socials
                            } 
                        }
                        return social;
                    })
                }
            }
        }
        case FOLLOW: {
            return {
                ...state,
                info: {
                    ...state.info,
                    following: [...state.info.following, action.user]
                }
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                info: {
                    ...state.info,
                    following: state.info.following.filter(following => following !== action.user)
                }
            }
        }
        case UPDATE_PRIVACY: {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    privacy: {
                        ...action.privacy
                    }
                }
            }
        }
        case UPDATE_NOTIFICATIONS: {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    notifications: {
                        ...action.notifications
                    }
                }
            }
        }
        case ADD_FAVORITE_LISTING: {
            return {
                ...state,
                info: {
                    ...state.info,
                    savedListings: [...state.info.savedListings, action.listing]
                }
            }
        }
        case REMOVE_FAVORITE_LISTING: {
            return {
                ...state,
                info: {
                    ...state.info,
                    savedListings: state.info.savedListings.filter(listing => listing !== action.listing)
                }
            }
        }
        case REMOVE_LISTINGS: {
            return {
                ...state,
                info: {
                    ...state.info,
                    listings: state.info.listings.filter(listing => listing !== action.listing)
                }
            }
        }
        default:
            return state;
    }
}

// ACTIONS CREATOR
export const setUserDataAC = user => ({type: SET_USER_DATA, user});
export const avatarUserUpdate = avatar => ({type: AVATAR_UPDATE, avatar});
export const profileUserUpdateAC = info => ({type: PROFILE_UPDATE, info});
export const followUserAC = user => ({type: FOLLOW, user});
export const unfollowUserAC = user => ({type: UNFOLLOW, user});
export const updatePrivacyAC = privacy => ({type: UPDATE_PRIVACY, privacy});
export const updateNotificationsAC = notifications => ({type: UPDATE_NOTIFICATIONS, notifications});
export const addFavoriteListingAC = listing => ({type: ADD_FAVORITE_LISTING, listing});
export const removeFavoriteListingAC = listing => ({type: REMOVE_FAVORITE_LISTING, listing});
export const removeListingAC = listing => ({type: REMOVE_LISTINGS, listing});
// THUNKS
export const getUserData = user => dispatch => {
    userAPI.getUserData(user)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(setUserDataAC(response.data.user));
            }
        })
}
export const setUserAvatar = avatar => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.avatarUpdate(user._id, avatar)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(avatarUserUpdate(avatar));
            }
        })
}
export const profileUserUpdate = info => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.updateUserProfile(user._id, info)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(profileUserUpdateAC(info));
                dispatch(notificationUpdateProfileAC(response.data.message))
            }
        })
}
export const followUser = follow => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.follow(user._id, follow)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(followUserAC(follow));
            }
        })
}
export const unfollowUser = unfollow => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.unfollow(user._id, unfollow)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(unfollowUserAC(unfollow));
            }
        })
}
export const updatePrivacy = privacy => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.updatePrivacy(user._id, privacy)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(updatePrivacyAC(privacy));
                dispatch(notificationUpdatePrivacyAC(response.data.message));
            }
        })
    
}
export const updateNotifications = notifications => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.updateNotifications(user._id, notifications)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(updateNotificationsAC(notifications));
            }
        })
}
export const updatePassword = (oldPassword, newPassword) => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.updatePassword(user._id, oldPassword, newPassword)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(notificationUpdatePasswordAC(response.data.message));
            }
        })
    
}
export const deactivateAccount = password => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.deactivateAccount(user._id, password)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(notificationDeactivateAccountAC(response.data.message));
            }
            else if(response.data.status === 202) {
                dispatch(userLogOut())
            }
        })
}
export const addFavoriteListing = listing => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.addFavoriteListing(user._id, listing)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(addFavoriteListingAC(listing))
            }
        })
}
export const removeFavoriteListing = listing => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.removeFavoriteListing(user._id, listing)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(removeFavoriteListingAC(listing))
            }
        })
}
// SELECTORS

export default userReducer;