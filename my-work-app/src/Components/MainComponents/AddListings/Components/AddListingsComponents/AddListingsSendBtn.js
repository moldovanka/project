import React from "react";
import "./AddListingsComponents.css";
import { Col } from 'reactstrap';

const AddListingsSendBtn = props => {
    return (
        <Col md={10} className="block_center">
            <button type="submit" className="add_listings_send_btn">Submit Now</button>
        </Col>
    )
}

export default AddListingsSendBtn;