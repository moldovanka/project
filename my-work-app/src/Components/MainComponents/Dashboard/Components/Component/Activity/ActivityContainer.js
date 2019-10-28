import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import Activity from "./Activity";
import { addPost, removePost, getUserPosts } from "../../../../../../redux/posts-reducer";
import { getPosts } from './../../../../../../redux/posts-reducer';
import openSocket from 'socket.io-client';
import { SERVER_URL } from "../../../../../../assets/Server_URL";

const ActivityContainer = props => {
    const socket = openSocket(SERVER_URL);
    useEffect(() => {
        if(props.userID !== "") {
            props.getUserPosts(props.userID)
        }
    }, [props.userID])
    useEffect(() => {
        socket.on(`user_post:${props.userID}`, () => {
            props.getUserPosts(props.userID)
        })
        return () => {
            socket.off(`user_post:${props.userID}`)
        }
    })
    return (
        <Activity
            {...props} 
            posts={props.posts}
        />
    )
}

let mapStateToProps = state => {
    return {
        isFetching: state.postsReducer.isFetching,
        posts: getPosts(state)
    }
}
let mapDispatchToProps = dispatch => {
    return {
        getUserPosts: user => dispatch(getUserPosts(user)),
        addPost: (target, message) => dispatch(addPost(target, message)),
        removePost: post => dispatch(removePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer)