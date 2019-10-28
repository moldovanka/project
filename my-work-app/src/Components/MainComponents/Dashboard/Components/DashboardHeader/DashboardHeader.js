import React from "react";
import "./DashboardHeader.css";
import { Col } from 'reactstrap';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';

const DashboardHeader = props => {
    return (
        <Col md={12}>
            <div className="dashboard_header_box">
                <div className="dashboard_header_avatar">
                    <img src={props.avatar} alt="avatar" className="avatar"></img>
                    <input 
                        type="file"
                        id="user_avatar"
                        onChange={e => props.setAvatar(e.currentTarget.files[0])}
                    />
                    {props.currentUser === props._id && 
                        <label
                            htmlFor="user_avatar"
                        >
                            <PhotoCameraRoundedIcon className="dashboard_header_avatar_upload"/>
                        </label>
                    }
                    
                </div>
                <p className="dashboard_header_name">{props.name}</p>
                {props.region !== "" ? (
                    <div className="dashboard_header_location">
                        <LocationOnIcon className="icon"/>
                        {props.region}
                    </div>
                ) : (
                    <div className="dashboard_header_location">
                        <LocationOnIcon className="icon"/>
                        {props.country}
                    </div>
                )}
                <div className="dashboard_header_info">
                    <div className="dashboard_header_info_item">
                        <p className="count">{props.listings.length}</p>
                        <p className="name">Listings</p>
                    </div>
                    <div className="dashboard_header_info_item">
                        <p className="count">{props.followers.length}</p>
                        <p className="name">Followers</p>
                    </div>
                    <div className="dashboard_header_info_item">
                        <p className="count">{props.following.length}</p>
                        <p className="name">Following</p>
                    </div>
                </div>
                <div className="dashboard_header_buttons">
                    {props.currentUser === props._id && <Link to="/settings" className="dashboard_header_button">Setting</Link>}
                    {props.currentUser !== props._id && <Link to="#" onClick={() => props.createDialog(props._id)} className="dashboard_header_button">Message</Link>}
                </div>
            </div>
        </Col>
    )
}

export default DashboardHeader;