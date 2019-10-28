import React, {useState} from "react";
import "./../Comment.css";
import PostContent from "./PostContent";
import { Row, Col } from 'reactstrap';
import { Formik } from 'formik';
const Post = props => {
    const [reply, setReply] = useState(false);
    return(
        <div className="post_box">
            <PostContent
                userID={props.userID}
                currentUserID={props.currentUserID}
                target="post" 
                post={props.post}
                reply={reply}
                setReply={setReply}
                removePost={props.removePost}
                
            />
            <div className={`post_user_reply ${reply ? "flex" : "hide"}`}>
                <img src={props.avatar} className="img"></img>
                <Formik
                    initialValues={{
                        reply: ""
                    }}
                    onSubmit={(values, actions) => {
                        props.addPostReply(props.post._id, values.reply)
                        .then(response => {
                            if(response.data.status === 200) {
                                props.setrepliesAction(!props.repliesAction);
                            }
                        })
                        setReply(false)
                        actions.resetForm();
                    }}
                    render={props => (
                        <form className="comment_form_send" onSubmit={props.handleSubmit}>
                            <Row>
                                <Col xl={10}>
                                    <textarea 
                                        placeholder="Reply comment"
                                        name="reply"
                                        value={props.values.reply}
                                        onChange={props.handleChange}
                                    />
                                </Col>
                                <Col xl={2}>
                                    <button type="submit">Reply</button>
                                </Col>
                            </Row>
                        </form>
                    )}
                >
                </Formik>
            </div>
            {props.replies.map(reply => {
                return (
                    <div className="post_user_reply" key={reply._id}>
                        <PostContent
                            userID={props.userID}
                            currentUserID={props.currentUserID}
                            target="reply" 
                            post={reply}
                            setReply={setReply}
                            postID={props.post._id}
                            removePost={props.removeReply}
                        />
                    </div>
                    
                )
                
            })}
        </div>
    )}

export default Post;