import React from "react";
import "./MyListings.css";
import { Container, Row, Col } from 'reactstrap';
import NotFoundItem from "../../../../../NotFoundItem";
import Preloader from "../../../../../../Preloader";
import ProfileListingsCard from '../../../../Common/ProfileListingsCard/ProfileListingsCard';

const MyListings = props => {
    return (
        <section className="dashboard_sections">
            <Container>
                <Row>
                    <Col xl={12}>
                        <h3 className="my_listings_title">Listings</h3>
                    </Col>
                </Row>
                <Row>
                    {props.listings ? (
                        props.listings.length === 0 ? (
                            <NotFoundItem />
                        ) : (
                            props.listings.map(listing => {
                                return (
                                    <ProfileListingsCard 
                                        key={listing._id}
                                        {...listing}
                                        delete={props.delete}
                                        userID={props.userID}
                                        currentUserID={props.currentUserID}
                                    />
                                )
                            })
                        )
                    ) : (
                        <Preloader />
                    )}
                </Row>
            </Container>
        </section>
    )
}

export default MyListings;