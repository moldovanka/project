import React from "react";
import "./../../../../ListingInfo.css";
import ReactFancyBox from 'react-fancybox';
import 'react-fancybox/lib/fancybox.css'
import { Row, Col } from 'reactstrap';

const ListingInfoGallery = props => {
    return (
        <div>
            <Row>
                {props.gallery.map((image, index) => {
                    return(
                        <Col sm={6} xl={3} key={index}>
                            <div className="listing_info_gallery_item">
                                <ReactFancyBox
                                    image={image} 
                                />
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default ListingInfoGallery;