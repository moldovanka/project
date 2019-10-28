import React from "react";
import "./AddListingsComponents.css";
import AddListingsHeader from './AddListingsHeader';
import { Col } from 'reactstrap';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const AddListingsPrice = props => {
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<AttachMoneyIcon />}
                    title="Price"
                />
                <div className="add_listings_box_content">
                    <input 
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="add_listings_box_content_input"
                        onChange={props.handleChange}
                    />
                </div>
            </div>
        </Col>
    )
}

export default AddListingsPrice;