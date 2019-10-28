import React from "react";
import "./../../ListingInfo.css";
import { Container, Row, Col } from 'reactstrap';
import { Rating } from '@material-ui/lab';

const ListingInfoHeader = props => {
    return (
        <section>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="listing_info_header_cover_img" style={{backgroundImage: `url(${props.coverImage})`}}></div>
                        <div className="listing_info_header_content">
                            <div className="listing_info_header_event">
                                <img src={props.logo} alt="logo" className="img"></img>
                                <div className="listing_info_header_event_rating">
                                    <h3>{props.name}</h3>
                                    <Rating
                                        readOnly 
                                        value={parseInt(props.rating)}
                                    />
                                </div>
                            </div>
                            <div>
                                <a href={`tel:${props.phone}`}>
                                    <button className="listing_info_header_event_callback">Call us</button>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ListingInfoHeader;