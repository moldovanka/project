import React from "react";
import "./ProfileDetails.css";
import DetailsIcon from '@material-ui/icons/Details';

const ProfileDetail = props => {
    return (
        <div className="profile_details_box">
            <div className="profile_details_header">
                <DetailsIcon className="icon"/>
                <h3>{props.title}</h3>
            </div>
            <div className="profile_details_content">
                {props.children}
            </div>
        </div>
    )
}

export default ProfileDetail;