import { userAPI, listingAPI } from "../api/api";

const SET_POSTS = "SET_POSTS";
const REMOVE_POST = "REMOVE_POST";


let initialState = {
    isFetching: true,
    posts: [],
}

const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_POSTS: {
            return {
                isFetching: false,
                posts: [...action.posts.reverse()],
            }
        }
        case REMOVE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.post)
            }
        }
        default:
            return state;
    }
}

// ACTIONS CREATOR
export const setPostsAC = posts => ({type: SET_POSTS, posts});
export const removePostAC = post => ({type: REMOVE_POST, post});
// THUNKS
export const getUserPosts = user => dispatch => {
    userAPI.getUserPosts(user)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(setPostsAC(response.data.posts));
            }
        })
}
export const getListingPosts = listing => dispatch => {
    listingAPI.getListingPosts(listing)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(setPostsAC(response.data.posts));
            }
        })
}
export const addPost = (target, message) => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.addPost(user._id, target, message)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(getUserPosts(target))
            }
        })
}
export const addListingPost = (target, message) => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    listingAPI.addPost(user._id, target, message)
}
export const removePost = post => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userAPI.removePost(user._id, post)
        .then(response => {
            if(response.data.status === 200) {
                dispatch(removePostAC(post))
            }
        })
}
export const removeListingPost = (post, listing) => dispatch => {
    listingAPI.removePost(listing, post)
}
export const addPostReply = (post, message) => dispatch => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return userAPI.addPostReply(user._id, post, message)
        
}
export const removePostReply = (post, reply) => dispatch => {
    return userAPI.removePostReply(post, reply)  
}
// SELECTORS
export const getPosts = state => {
    return state.postsReducer.posts;
}

export default postsReducer;