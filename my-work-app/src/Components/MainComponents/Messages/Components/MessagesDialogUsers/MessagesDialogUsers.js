import React, {useEffect} from "react";
import "./MessagesDialogUsers.css";
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import {  getDialog, getDialogs } from './../../../../../redux/dialog-reducer';
import NotFoundItem from "../../../../NotFoundItem";
import UsersDialogContainer from "../UsersDialogContainer";
import Slider from "react-slick";

const useMessagesDialogUsersStyles = makeStyles(theme => ({
    search_icon: {
        position: "absolute",
        cursor: "pointer",
        top: "20px",
        left: "20px"
    },
}))

const MessagesDialogUsers = props => {
    const classes = useMessagesDialogUsersStyles();
    const settings = {
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
      };
    return (
        <div className="users_dialog_box">
            <div className="users_dialog_search">
                <Formik
                    render={propsForm => (
                        <form onSubmit={e => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="Enter a keyword"
                                name="name"
                                onChange={e => props.getDialogs(e.currentTarget.value)}
                            />
                            <SearchIcon 
                                classes={
                                    {
                                        root: classes.search_icon
                                    }
                                }
                            />
                        </form>
                    )}
                >
                </Formik>
            </div>
            <div className="users_dialog_list">
            {props.dialogs.length === 0 ? (
                <NotFoundItem />
            ) : (
                <>
                    <div className="users_dialog_users">
                        {props.dialogs.map(dialog => {
                            return (
                                <UsersDialogContainer
                                    key={dialog._id} 
                                    {...dialog}
                                    getDialog={props.getDialog}
                                />
                            )
                        })}
                    </div>
                    <div className="users_dialog_users_slider">
                        <Slider {...settings}>
                            {props.dialogs.map(dialog => {
                                return (
                                    <UsersDialogContainer
                                        key={dialog._id} 
                                        {...dialog}
                                        getDialog={props.getDialog}
                                    />
                                )
                            })}
                        </Slider>
                    </div>
                </>
            )}
            
            </div>
        </div>
    )
}

let mapDispatchToProps = dispatch => {
    return {
        getDialogs: search => dispatch(getDialogs(search)),
        getDialog: dialog => dispatch(getDialog(dialog)),
    }
}

export default connect(null, mapDispatchToProps)(MessagesDialogUsers);