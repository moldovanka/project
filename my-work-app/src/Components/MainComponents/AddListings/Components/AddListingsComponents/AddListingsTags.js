import React from "react";
import "./AddListingsComponents.css";
import AddListingsHeader from './AddListingsHeader';
import { Col } from 'reactstrap';
import LabelIcon from '@material-ui/icons/Label';

const AddListingsTags = props => {
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<LabelIcon />}
                    title="Tags"
                />
                <div className="add_listings_box_content">
                    <input 
                        type="text"
                        name="tags"
                        placeholder="#tag1#tag2"
                        className="add_listings_box_content_input"
                        onChange={props.handleChange}
                    />
                </div>
            </div>
        </Col>
    )
}
export default AddListingsTags;