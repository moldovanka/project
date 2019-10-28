import React from "react";
import "./AddListingsComponents.css";
import AddListingsHeader from "./AddListingsHeader";
import CreateIcon from '@material-ui/icons/Create';
import { Col } from 'reactstrap';

const AddListingsDescription = props => {
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader  
                    icon={<CreateIcon />}
                    title="Description"
                />
                <div className="add_listings_box_content">
                    <textarea 
                        placeholder="Write feedback here"
                        className="add_listings_box_content_textarea"
                        name="description"
                        value={props.value}
                        onChange={props.handleChange}
                    />
                </div>
            </div>
        </Col>
    )
}

export default AddListingsDescription;