import React from "react";
import "./AddListings.css";
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const AddListingsItem = props => {
    let col = 12 / props.items.length;
    return (
        <>
            <Col md={12}>
                <h3 className="add_listings_item_title">{props.title}</h3>
            </Col>
            {props.items.map((item, index) => {
                return (
                    <Col xl={col || 12} key={index}>
                        <Link to={props.url[index]}>
                            <div className="add_listings_item_box">
                                {props.itemsIcon[index]}
                                <p>{item}</p>
                            </div>
                        </Link>
                    </Col>
                )
            })}
        </>
    )
}

export default AddListingsItem;