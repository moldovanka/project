import React from "react";
import "./AddListingsComponents.css";
import AddListingsHeader from './AddListingsHeader';
import { Col } from 'reactstrap';
import DetailsIcon from '@material-ui/icons/Details';

const AddListingsDetails = props => {
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<DetailsIcon />}
                    title="Listing Details"
                />
                <div className="add_listings_box_content">
                    {props.items.map((item, index) => {
                        return (
                            <div className="add_listings_details" key={index}>
                                <p className="add_listings_title">{item}</p>
                                <input 
                                    type="text"
                                    name={item}
                                    placeholder={item}
                                    className="add_listings_box_content_input"
                                    onChange={e => props.details[item] = e.currentTarget.value}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Col>
    )
}

export default AddListingsDetails;