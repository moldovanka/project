import React from "react";
import "./../Comment.css";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const PostContent = props => {
    let time = new Date(props.post.create);
    let month = time.toLocaleString('en', { month: 'short'});
    let day = time.getDate();
    let year = time.getFullYear();
    let hours = time.toLocaleString('en', { hour: '2-digit', minute: "numeric"});
    return(
        <>
            <div className="post_heading">
                <div className="post_heading_user">
                    <img src={props.post.user.info.avatar} alt="avatar" className="img"></img>
                    <div className="post_heading_user_info">
                        <h3>{props.post.user.info.name}</h3>
                        <p>{month} {day}, {year} at {hours}</p>
                    </div>
                </div>
                {props.reply !== undefined && <p onClick={() => props.setReply(!props.reply)}>Reply</p>}
            </div>
            <p className="post_text">
                {props.post.text}
            </p>
            {props.target === "post" ? (
                (props.currentUserID === props.userID || props.currentUserID === props.post.user._id) && 
                <HighlightOffIcon 
                    className="post_delete_icon"
                    onClick={() => props.removePost(props.post._id)}
                />
            ) : (
                (props.currentUserID === props.userID || props.currentUserID === props.post.user._id) && 
                <HighlightOffIcon 
                    className="post_delete_icon"
                    onClick={() => props.removePost(props.postID, props.post._id)}
                />
            )}
            
        </>
    )}

export default PostContent;