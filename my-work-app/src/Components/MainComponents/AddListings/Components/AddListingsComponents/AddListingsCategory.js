import React, {useState} from "react";
import "./AddListingsComponents.css";
import AddListingsHeader from "./AddListingsHeader";
import { Col } from 'reactstrap';
import CategoryIcon from '@material-ui/icons/Category';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const AddListingsCategory = props => {
    const [toggleList, setToggleList] = useState(false);
    const setCategory = e => {
        let category = e.currentTarget.innerText;
        props.setField("category", category);
        setToggleList(false)
    }
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<CategoryIcon />}
                    title="Category"
                />
                <div className="add_listings_box_content">
                    <div style={{position: "relative"}}>
                        <input 
                            type="text"
                            name="category"
                            placeholder="Select Category"
                            className="add_listings_box_content_category"
                            value={props.value}
                            onClick={() => setToggleList(!toggleList)}
                            readOnly
                        />
                        {toggleList ? (
                            <ArrowDropUpIcon className="add_listings_list_icon"/>
                        ) : (
                            <ArrowDropDownIcon className="add_listings_list_icon"/>
                        )}
                        <div style={{position: "relative"}}>
                            <div className={`add_listings_list ${toggleList ? "show" : ""}`}>
                                {props.categoryList.map((category, index) => {
                                    return (
                                        <p key={index} onClick={e => setCategory(e)}>{category}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default AddListingsCategory;