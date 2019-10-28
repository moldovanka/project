import React from "react";
import "./AddListingsComponents.css";
import AddListingsHeader from './AddListingsHeader';
import { Col } from 'reactstrap';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const AddListingsPlace = props => {
return (
    <Col md={10} className="block_center">
        <div className="add_listings_box">
            <AddListingsHeader 
                icon={<LocationOnIcon />}
                title="Place"
            />
            <div className="add_listings_box_content">
                <input 
                    type="text"
                    name="place"
                    placeholder="e.g. “Ukraine"
                    className="add_listings_box_content_input"
                    onChange={props.handleChange}
                />
            </div>
        </div>
    </Col>
)}

export default AddListingsPlace;