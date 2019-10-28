import React from "react";
import "./AddListingsComponents.css";

const AddListingsHeader = props => {
    return (
        <div className="add_listings_box_header">
            {props.icon}
            <h3>{props.title}</h3>
        </div>
    )
}

export default AddListingsHeader;