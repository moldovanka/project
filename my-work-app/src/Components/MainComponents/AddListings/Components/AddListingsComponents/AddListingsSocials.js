import React, {useState} from "react";
import "./AddListingsComponents.css";
import { Row, Col } from 'reactstrap';
import AddListingsHeader from './AddListingsHeader';
import PeopleIcon from '@material-ui/icons/People';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';

const AddListingsSocial = props => {
    const [isSelected, setSelected] = useState(false);
    const [selectedID, setSelectedID] = useState(1);
    let item = ["Facebook", "Twitter", "Instagram"];
    const handlechange = (e, id) => {
        if(e.currentTarget.name == "social_url") {
            let value = e.currentTarget.value;
            let newObj = props.socials.map((item, index) => {
                if(index == id) {
                    return {...item, url: value}
                }
                return item;
            })
            props.setField("socials", newObj);
        } else {
            let value = e.currentTarget.innerText;
            setSelected(!isSelected);
            let newObj = props.socials.map((item, index) => {
                if(index == id) {
                    return {...item, category: value}
                }
                return item;
            })
            props.setField("socials", newObj);
        }
    }
    const addSocial = () => {
        let socialObj = {
            category: "",
            url: ""
        }
        props.setField("socials", [...props.socials,socialObj]);
    }
    const deleteSocial = (e, id) => {
        let newObj = props.socials.filter((item, index) => index !== id);
        props.setField("socials", newObj);
    }
    const openList = (e, id) => {
        setSelectedID(id);
        setSelected(!isSelected);
    }
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<PeopleIcon />}
                    title="Social Network Accounts"
                />
                <div className="add_listings_box_content">
                    {props.socials.map((social, index) => {
                        return(
                        <div className="add_listings_socials" key={index}>
                        <Row>
                            <Col md={6} >
                                <div style={{position: "relative"}}>
                                    <input 
                                        type="text"
                                        name="socials"
                                        placeholder="Select Category"
                                        className="add_listings_box_content_input"
                                        onClick={e => openList(e, index)}
                                        value={social.category}
                                        required
                                        readOnly
                                    />
                                    {index === selectedID && isSelected ? (
                                        <ArrowDropUpIcon className="add_listings_list_icon"/>
                                    ) : (
                                        <ArrowDropDownIcon className="add_listings_list_icon"/>
                                    )}
                                    <div className={`add_listings_list ${index === selectedID && isSelected ? "show" : ""}`}>
                                        {item.map((item,i) => {
                                            return (
                                                <p key={i} onClick={e => handlechange(e, index)}>
                                                    {item}
                                                </p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <input 
                                    type="text"
                                    name="social_url"
                                    placeholder="URL"
                                    className="add_listings_box_content_input"
                                    value={social.url}
                                    onChange={e => handlechange(e, index)}
                                    required
                                />
                                {props.socials.length > 1 ? (
                                    <ClearIcon className="add_listings_remove_gallery_icon"
                                    onClick={e => deleteSocial(e, index)}
                                />
                                ) : null}
                            </Col>
                        </Row>
                        </div>
                        )
                    })}
                </div>
                <div className="add_listings_btn">
                    <button type="button" onClick={addSocial}>Add Social Account</button>
                </div>
            </div>
        </Col>
    )
}

export default AddListingsSocial;