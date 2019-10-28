import React, {useState, useEffect} from "react";
import Post from './Post';
import { connect } from 'react-redux';
import { addPostReply, removePostReply, getReplies } from "../../../../../redux/posts-reducer";
import { userAPI } from "../../../../../api/api";
import openSocket from 'socket.io-client';
import { SERVER_URL } from "../../../../../assets/Server_URL";

const PostContainer = props => {
    const socket = openSocket(SERVER_URL);
    const [replies, setReplies] = useState(props.post.replies);
    const [repliesAction, setrepliesAction] = useState(false);
    useEffect(() => {
        userAPI.getUserPostsReply(props.post._id)
            .then(res => {
                if(res.data.status === 200) {
                    setReplies(res.data.replies)
                }
            })
    }, [])
    useEffect(() => {
        socket.on(`comment_actions:${props.post._id}`, () => {
            userAPI.getUserPostsReply(props.post._id)
                .then(res => {
                    if(res.data.status === 200) {
                        setReplies(res.data.replies)
                    }
                })
        })
        return () => {
            socket.off(`comment_actions:${props.post._id}`)
        }
    })
    const removeReply = (post, reply) => {
        props.removePostReply(post, reply)
            .then(res => {
                if(res.data.status === 200) {
                    setrepliesAction(!repliesAction)
                }
            })
    }
    return (
        <Post 
            {...props}
            replies={replies}
            removeReply={removeReply}
            repliesAction={repliesAction}
            setrepliesAction={setrepliesAction}
        />
    )
}
let mapDispatchToProps = dispatch => {
    return {
        addPostReply: (post, message) => dispatch(addPostReply(post, message)),
        removePostReply: (post, reply) => dispatch(removePostReply(post, reply))
    }
}
export default connect(null, mapDispatchToProps)(PostContainer)