import React, {useEffect} from "react";
import "./../../../../ListingInfo.css";
import Comment from './../../../../../Common/Comment/Comment';
import { connect } from 'react-redux';
import { addListingPost, getPosts, getListingPosts, removeListingPost } from "../../../../../../../redux/posts-reducer";
import openSocket from 'socket.io-client';
import { SERVER_URL } from "../../../../../../../assets/Server_URL";

const ListingInfoComments = props => {
    const socket = openSocket(SERVER_URL);
    useEffect(() => {
        props.getListingPosts(props.listingID)
    }, [])
    useEffect(() => {
        socket.on(`listing_post:${props.listingID}`, () => {
            props.getListingPosts(props.listingID)
        })
        return () => {
            socket.off(`listing_post:${props.listingID}`)
        }
    })
    return (
        <Comment
            target={props.listingID}
            posts={props.posts}
            {...props}
        />
    )
}
let mapStateToProps = state => {
    return {
        currentUserID: state.userReducer._id,
        avatar: state.userReducer.info.avatar,
        isFetching: state.postsReducer.isFetching,
        posts: getPosts(state)
    }
}
let mapDispatchToProps = (dispatch, props) => {
    return {
        getListingPosts: listing => dispatch(getListingPosts(listing)),
        addPost: (target, message) => dispatch(addListingPost(target, message)),
        removePost: post => dispatch(removeListingPost(post, props.listingID))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListingInfoComments);