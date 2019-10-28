import { authAPI } from "../api/api";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

let initialState = {
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                isAuth: true
            }
        }
        case LOGOUT: {
            return {
                isAuth: false
            }
        }
        default:
            return state;
    }
}
////////////////////////////////////////////
export const logInAC = () => ({type: LOGIN});
export const logOutAC = () => ({type: LOGOUT});
//////////////////////////////////////////////////
export const getAuthUser = user => dispatch => {
    const _id = user._id;
    const email = user.email;
    const password = user.password;
    localStorage.setItem("currentUser", JSON.stringify({_id, email, password}));
    dispatch(logInAC());
}
export const authUser = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    authAPI.auth(user._id)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(logInAC())
            }
        })
}
export const userLogOut = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    authAPI.logout(user._id)
        .then(response => {
            if(response.data.status === 200) {
                localStorage.removeItem("currentUser");
                dispatch(logOutAC())
            }
        })
}


export default authReducer;