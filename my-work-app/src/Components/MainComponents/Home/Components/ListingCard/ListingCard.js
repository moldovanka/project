import React from "react";
import "./ListingCard.css";
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const ListingCard = props => {
    return (
        <>
            {props.listings.map(listing => {
                return (
                    <Col sm={6} md={props.size_md || 4} lg={props.size_lg || 4} xl={props.size || 3} key={listing._id}>
                        <div className="listing_card_item">
                            <div className="listing_card_item_image">
                                <Link to={`/event/${listing._id}`} className="overlap"></Link>
                                <img src={listing.event.images.logo} alt="img"></img>
                                <div className="listing_card_item_image_content">
                                    <Link to={`/event/${listing._id}`} className="title">{listing.event.name}</Link>
                                    <div className="listing_card_item_image_content_place">
                                        <PlaceIcon />
                                        {listing.event.place}
                                    </div>
                                </div>
                                {!props.saved.includes(listing._id) && 
                                    <div 
                                        className="listing_card_item_favorite"
                                        onClick={() => props.save(listing._id)}
                                    >
                                        <FavoriteBorderOutlinedIcon />
                                    </div>
                                }
                            </div>
                            <div className="listing_card_item_user">
                                <div className="listing_card_item_user_avatar">
                                    <img src={listing.user.info.avatar} alt="avatar"></img>
                                </div>
                                <div className="listing_card_item_user_name">
                                    <Link to={`/user/${listing.user._id}`}>
                                        By {listing.user.info.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                )
                })
            }
        </>
      )
}

export default ListingCard;