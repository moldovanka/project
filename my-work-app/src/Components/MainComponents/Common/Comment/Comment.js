import React, {useState} from "react";
import "./Comment.css";
import { Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import Preloader from "../../../../Preloader";
import PostContainer from './Posts/PostContainer';
import NotFoundItem from "../../../NotFoundItem";

const Comment = props => {
    return (
        <div>
            <div className="comment_send_box">
                <div className="comment_send">
                    <img src={props.avatar} className="img"></img>
                    <Formik
                        initialValues={{
                            text: ""
                        }}
                        onSubmit={(values, actions) => {
                            props.addPost(props.target, values.text);
                            actions.resetForm();
                        }}
                        render={propsform => (
                            <form className="comment_form_send" onSubmit={propsform.handleSubmit}>
                                <Row>
                                    <Col xl={10}>
                                        <textarea
                                            placeholder="Write comment here"
                                            name="text"
                                            value={propsform.values.text}
                                            onChange={propsform.handleChange}
                                        />
                                    </Col>
                                    <Col xl={2}>
                                        <button type="submit">Submit</button>
                                    </Col>
                                </Row>
                            </form>
                        )}
                    >
                    </Formik>
                </div>
            </div>
            {props.isFetching ? (
                <Preloader />
            ) : (
            props.posts.length === 0 ? (
                <NotFoundItem />
            ) : (
                props.posts.map(post => {
                return(
                    <PostContainer
                        key={post._id}
                        userID={props.userID}
                        currentUserID={props.currentUserID}
                        avatar={props.avatar} 
                        post={post}
                        removePost={props.removePost}
                    />
                )
            })
            )
            )}
            
        </div>
    )
}

export default Comment;