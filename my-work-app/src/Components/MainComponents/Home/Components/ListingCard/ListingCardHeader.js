import React from "react";
import "./ListingCard.css";
import { Col } from 'reactstrap';

const ListingCardHeader = props => {
    return (
        <Col md={12} className="listing_card_header">
            <h3>{props.title}</h3>
        </Col>
)
}

export default ListingCardHeader;