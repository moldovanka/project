import React from "react";
import "./Users.css";
import { makeStyles } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
const useUserCardStyle = makeStyles(theme => ({
    location_icon: {
        fontSize: "14px",
        color: "#fa2276",
        marginRight: "3px"
    },
}))

const UserCard = props => {
    const classes = useUserCardStyle();
    return (
        <Col sm={6} lg={4} xl={3}>
            <div className="user_card_box">
                <Link to={`/user/${props._id}`}>
                    <img src={props.info.avatar} className="user_card_avatar"></img>
                </Link>
                <Link to={`/user/${props._id}`}>
                    <h3 className="user_card_name">{props.info.name}</h3>
                </Link>
                <div className="user_card_location">
                    <LocationOnIcon 
                        classes={
                            {
                                root: classes.location_icon
                            }
                        }
                    />
                    {props.info.region || props.info.country}
                </div>
                <div className="user_card_info">
                    <div>
                        <p className="user_card_info_count">{props.info.listings.length}</p>
                        <p className="user_card_info_name">Listing</p>
                    </div>
                    <div>
                        <p className="user_card_info_count">{props.info.followers.length}</p>
                        <p className="user_card_info_name">Followers</p>
                    </div>
                    <div>
                        <p className="user_card_info_count">{props.info.following.length}</p>
                        <p className="user_card_info_name">Following</p>
                    </div>
                </div>
                {props.currentUserID !== props._id &&
                <>
                    {props.info.followers.includes(props.currentUserID) ? (
                        <button 
                            className="user_card_btn"
                            onClick={() => props.unfollow(props._id)}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button 
                            className="user_card_btn"
                            onClick={() => props.follow(props._id)}
                        >
                            Follow
                        </button>
                    )}
                </>
                }
            </div>
        </Col>
    )
}

export default UserCard;