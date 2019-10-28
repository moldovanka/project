import React from "react";
import "./../../ListingInfo.css";
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const ListingInfoAuthor = props => {
    return(
        <section className="listing_info_author_section">
           <Container>
               <Row>
                   <Col xl={6} sm={12}>
                        <div className="listing_info_author_box">
                            <div className="listing_info_author_info">
                                <div className="listing_info_author_info_author">
                                    <img src={props.info.avatar} alt="avatar" className="avatar"></img>
                                    <h3>By {props.info.name}</h3>
                                </div>
                                {props.currentUserID !== props._id && 
                                    <Link to="#" className="listing_info_author_btn" onClick={() => props.createDialog(props._id)}>Direct Message</Link>
                                }
                            </div>
                        </div>
                   </Col>
               </Row>
           </Container>
        </section>
    )
}

export default ListingInfoAuthor;