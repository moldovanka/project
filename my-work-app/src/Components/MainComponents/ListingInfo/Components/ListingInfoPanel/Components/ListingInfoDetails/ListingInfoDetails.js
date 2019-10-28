import React from "react";
import "./../../../../ListingInfo.css";
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import DescriptionIcon from '@material-ui/icons/Description';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import ToysIcon from '@material-ui/icons/Toys';
import CategoryIcon from '@material-ui/icons/Category';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useEventDetails = makeStyles(theme => ({
    box: {
        border: "1px solid #1b1b1b",
        padding: "20px",
        margin: "30px 0px",
        background: "#1b1b1b",
        "&:last-child": {
            margin: "30px 0px 0px",
        }
    },
    heading: {
        display: "flex",
        alignItems: "flex-end",
        textTransform: "capitalize",
        paddingBottom: "20px",
        fontSize: "18px",
        fontWeight: "500",
        "& h3": {
            fontSize: "14px",
            fontWeight: "500",
            color: "#fff",
            lineHeight: "16px"
        },
        "& svg": {
            marginRight: "12px"
        }
    },
    desc_text: {
        fontSize: "14px",
        lineHeight: "24px",
        color: "#bdc3d3",
        fontWeight: "400"
    },
    map: {
        position: "unset !important",
    },


    tags: {
        display: "flex",
        flexFlow: "wrap"
    },
    tag: {
        margin: "0px 7px 10px 0px",
        fontSize: "14px",
        fontWeight: "400",
        color: "#bdc3d3",
        background: "#1b1b1b",
        padding: "8px 24px",
        minHeight: "30px",
        border: "1px solid #343434",
        cursor: "pointer",
        textTransform: "capitalize",
        "&:hover": {
            background: "#1b1b1b",
            border:"1px solid #fff",
            boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.2)",
            color: "#fff"
        }
    },
    purpose: {
        color: "#bdc3d3",
        fontSize: "14px"
    },
    price: {
        fontSize: "18px",
        fontWeight: "500",
        color: "#434f74",
        marginTop: "10px"
    },
    author_name: {
        color: "#fa2276",
        "&:hover": {
            color: "#fff"
        }
    },
    spec_info: {
        display: "flex",
        justifyContent: "space-between",
        lineHeight: "30px",
        color: "#898989",
        fontSize: "14px",
        "& .property": {
            color: "#434f74",
            fontWeight: "400"
        },
        "& .value": {
            color: "#959fbb",
            fontWeight: "400"
        }
    },
    social_icons: {
        paddingRight: "15px",
        fontSize: "16px",
        color: "#bdc3d3",
        "&:hover": {
            color: "#fff"
        },
        "& span": {
            fontSize: "16px",
        }
    },
    text: {
        color: "#bdc3d3",
        fontSize: "14px"
    },
    socials_block: {
        "& span": {
            color: "#fa2276",
            padding: "20px 20px 20px 0px",
        },
        "& a": {
            color: "#bdc3d3",
            fontSize: "14px",
            fontWeight: "400",
            "&:hover": {
                color: "#fff"
            }
        }
    },
}))

const ListingInfoDetails = props => {
    return (
        <div>
            <Row>
                <Col md={6}>
                    <div className="listing_info_details_box">
                        <div className="listing_info_details_box_header">
                            <PersonIcon />
                            <h3>Author</h3>
                        </div>
                        <Link to={`/user/${props.listing.user._id}`} className="listing_info_details_author">{props.listing.user.info.name}</Link>
                    </div>
                    <div className="listing_info_details_box">
                        <div className="listing_info_details_box_header">
                            <DescriptionIcon />
                            <h3>Description</h3>
                        </div>
                        <div className="listing_info_details_text">
                            {props.listing.event.description}
                        </div>
                    </div>
                    <div className="listing_info_details_box">
                        <div className="listing_info_details_box_header">
                            <CategoryIcon />
                            <h3>Categories</h3>
                        </div>
                        <p className="listing_info_details_text">{props.listing.event.category}</p>
                    </div>
                    <div className="listing_info_details_box">
                        <div className="listing_info_details_box_header">
                            <LoyaltyIcon />
                            <h3>Tags</h3>
                        </div>
                        <div className="listing_info_details_tags">
                            {props.listing.event.tags.slice(1).split("#").map((tag, index) => {
                                  return <span key={index} className="listing_info_details_tag">{tag}</span>
                               })}
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    {props.listing.event.price !== undefined && 
                        <div className="listing_info_details_box">
                            <div className="listing_info_details_box_header">
                                <AttachMoneyIcon />
                                <h3>Price</h3>
                            </div>
                            <p className="listing_info_details_text">For Sell</p>
                            <p className="listing_info_details_price">{props.listing.event.price}</p>
                        </div>
                    }
                    {props.listing.event.schedule !== undefined && 
                        <div className="listing_info_details_box">
                            <div className="listing_info_details_box_header">
                                <ScheduleIcon />
                                <h3>Schedule</h3>
                            </div>
                            <ul>
                                {Object.keys(props.listing.event.schedule).map((day, index) => {
                                    let value;
                                    if(!props.listing.event.schedule[day].open && !props.listing.event.schedule[day].close) {
                                        value = "day off"
                                    } else {
                                        value = `${props.listing.event.schedule[day].open} - ${props.listing.event.schedule[day].close}`
                                    }
                                    return (
                                        <li key={index} className="listing_info_details_detail">
                                            <p className="property">{day}</p>
                                            <p className="value">{value}</p>
                                        </li>
                                    )
                                })}
                                
                            </ul>
                        </div>
                    }
                    {props.listing.event.details !== undefined && 
                        <div className="listing_info_details_box">
                            <div className="listing_info_details_box_header">
                                <SettingsInputComponentIcon />
                                <h3>Details</h3>
                            </div>
                            <ul>
                                {Object.keys(props.listing.event.details).map((property, index) => {
                                    return (
                                        <li key={index} className="listing_info_details_detail">
                                            <p className="property">{property}</p>
                                            <p className="value">{props.listing.event.details[property]}</p>
                                        </li>
                                    )
                                })}
                                
                            </ul>
                        </div>
                    }
                    <div className="listing_info_details_box">
                        <div className="listing_info_details_box_header">
                            <ToysIcon />
                            <h3>Follow Us</h3>
                        </div>
                        <div>
                        {props.listing.event.socials.map((social, index) => {
                                return (
                                    <div className="listing_info_details_socials" key={index}>
                                        <span>{social.category}:</span>
                                        <a href={social.url} target="_blank">{social.url}</a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="listing_info_details_box">
                        <div className="listing_info_details_box_header">
                            <ToysIcon />
                            <h3>Region</h3>
                        </div>
                        <p className="listing_info_details_text">{props.listing.event.place}</p>
                    </div>
                </Col>  
            </Row>
        </div>
    )
}

export default ListingInfoDetails;