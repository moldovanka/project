import React from "react";
import "./AddListingsComponents.css";
import AddListingsHeader from './AddListingsHeader';
import { Col } from 'reactstrap';
import CreateIcon from '@material-ui/icons/Create';

const AddListingsName = props => {
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<CreateIcon />}
                    title="Title"
                />
                <div className="add_listings_box_content">
                    <input 
                        type="text"
                        name="name"
                        placeholder="Name the Listing"
                        className="add_listings_box_content_input"
                        value={props.value}
                        onChange={props.handleChange}
                        maxlength="30"
                        required
                    />
                </div>
            </div>
        </Col>
    )
}

export default AddListingsName;