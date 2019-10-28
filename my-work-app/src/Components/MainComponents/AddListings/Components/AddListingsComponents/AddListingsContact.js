import React from "react";
import "./AddListingsComponents.css";
import { Col } from 'reactstrap';
import AddListingsHeader from './AddListingsHeader';
import InfoIcon from '@material-ui/icons/Info';

const AddListingsContact = props => {
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<InfoIcon />}
                    title="Contact Information"
                />
                <div className="add_listings_box_content">
                    <p className="add_listings_title">Email</p>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Example : johndoe@example.com"
                        className="add_listings_box_content_input"
                        onChange={props.handleChange}
                        required
                    />
                </div>
                <div className="add_listings_box_content">
                    <p className="add_listings_title">Phone</p>
                    <input 
                        type="phone"
                        name="phone"
                        placeholder="Enter Phone Number"
                        className="add_listings_box_content_input"
                        onChange={props.handleChange}
                        required
                    />
                </div>
            </div>
        </Col>
    )
}
export default AddListingsContact;