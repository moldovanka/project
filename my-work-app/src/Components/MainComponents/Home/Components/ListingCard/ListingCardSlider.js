import React from "react";
import "./ListingCard.css";
import Slider from "react-slick";
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const ListingCardSlider = props => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
        ]
      };
    return (
        <Slider {...settings}>
            {props.listings.map(listing => {
                return (
                    <Col xl={12} key={listing._id}>
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
        </Slider>
      )
}

export default ListingCardSlider;