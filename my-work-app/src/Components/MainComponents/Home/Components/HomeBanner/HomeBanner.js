import React from "react";
import "./HomeBanner.css";
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from "./banner_img.svg";

const HomeBanner = props => {
    return(
        <Row>
            <Col md={12}>
                <div className="home_banner_box">
                    <div className="home_banner_content">
                        <h3>World's Largest Classifieds and Listing Portal.</h3>
                        <h5>Post Unlimited Classifieds Listing Free of Cost From Anywhere.</h5>
                        <Link to="/add_listing">
                            Add Lisiting
                        </Link>
                    </div>
                    <div className="home_banner_img">
                        <img src="https://i.ibb.co/W64Yc3W/Moldovanka.png" alt="img"></img>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default HomeBanner;