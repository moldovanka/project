import React from "react";
import "./ProfileListingsCard.css";
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const ProfileListingsCard = props => {
    let time = new Date(props.created);
    let month = time.toLocaleString('en', { month: 'short'});
    let day = time.getDate();
    let year = time.getFullYear();
    return(
        <Col sm={12} md={6} lg={3} >
            <div className="profile_listings_card_item">
                <div className="profile_listings_card_item_header">
                    <img src={props.event.images.logo || "https://www.milton.ca/en/live/resources/Events.jpg"} alt="event" className="img"></img>
                    <Link to={`/event/${props._id}`}><h4>{props.event.name}</h4></Link>
                    <p>Created : {day} {month} {year}</p>
                </div>
                <span className="profile_listings_card_item_section">{props.event.section}</span>
                {props.userID === props.currentUserID &&
                    <ul className="profile_listings_card_item_footer">
                        <li onClick={() => props.delete(props._id)}>
                            Delete
                        </li>
                    </ul>
                }
                
            </div>
        </Col>
    )
}

export default ProfileListingsCard;