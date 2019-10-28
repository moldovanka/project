import React from "react";
import NotFoundItem from "../../../../../../NotFoundItem";
import Preloader from "../../../../../../../Preloader";
import { homePanel } from './../../../HomePanel/HomePanel';
import { Row } from 'reactstrap';
import ListingCardHeader from "../../../ListingCard/ListingCardHeader";
import ListingCardSliderContainer from "../../../ListingCard/ListingCardSliderContainer";

const AllListings = props => {
    const category = homePanel.slice(1);
    return (
        <section className="home_section">
            {props.listings ? (
                props.listings.length === 0 ? (
                    <NotFoundItem />
                ) : (
                    category.map((category, index) => {
                        let listings = props.listings.filter(listing => listing.event.section === category.toLowerCase());
                        if(listings.length === 0) {
                            return;
                        }
                        return (
                            <React.Fragment key={index}>
                                <Row>
                                    <ListingCardHeader title={category} />
                                </Row>
                                <ListingCardSliderContainer
                                    listings={listings}
                                />
                            </React.Fragment>
                        )
                    })
                )
            ) : (
                <Preloader />
            )}
        </section>
    )
}

export default AllListings;