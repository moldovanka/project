import React from "react";
import "./../MyListings/MyListings.css"
import { Container, Row, Col } from 'reactstrap';
import ProfileListingsCard from '../../../../Common/ProfileListingsCard/ProfileListingsCard';
import NotFoundItem from '../../../../../NotFoundItem';
import Preloader from "../../../../../../Preloader";

const Saved = props => {
    return(
        <section className="dashboard_sections">
            <Container>
                <Row>
                    <Col xl={12}>
                        <h3 className="my_listings_title">Saved listings</h3>
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

export default Saved;