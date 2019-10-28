import React from "react";
import "./ChangeUserDetails.css";
import DetailsIcon from '@material-ui/icons/Details';

const ChangeUserDetailsItem = props => {
    return(
        <div className="change_details_box">
            <div className="change_details_box_title">
                <DetailsIcon className="icon"/>
                <h3>{props.settingName}</h3>
            </div>
            <div className="change_details_box_body">
                {props.children}
            </div>
        </div>
    )
}
export default ChangeUserDetailsItem;