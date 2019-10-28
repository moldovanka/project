import { listingAPI } from "../api/api";
import { removeListingAC } from "./user-reducer";
const SET_UPLOADING = "SET_UPLOADING";

let initialState = {
    uploading: false
}

const eventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_UPLOADING: {
            return {
                ...state,
                uploading: !state.uploading
            }
        }
        default:
            return state;
    }
}

// ACTIONS CREATOR
export const isUploadingAC = () => ({type: SET_UPLOADING})
// THUNKS
export const addListing = listing => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    listingAPI.addListing(user._id, listing)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(isUploadingAC())
            }
        })
}
export const removeListing = listing => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    listingAPI.removeListing(user._id, listing)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(removeListingAC(listing))
            }
        })
}
// SELECTORS

export default eventsReducer;