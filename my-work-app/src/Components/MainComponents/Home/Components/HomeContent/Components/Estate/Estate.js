import React from "react";
import ListingCardContainer from "../../../ListingCard/ListingCardContainer";
import NotFoundItem from "../../../../../../NotFoundItem";
import Preloader from "../../../../../../../Preloader";
import { Row } from 'reactstrap';
import { estateList } from './../../../../../AddListings/Components/AddListingsComponents/CategoryList';
import ListingCardHeader from "../../../ListingCard/ListingCardHeader";

const Estate = props => {
    const category = estateList;
    return (
        <section className="home_section">
            {props.listings ? (
                props.listings.length === 0 ? (
                    <NotFoundItem />
                ) : (
                    category.map((category, index) => {
                        let listings = props.listings.filter(listing => listing.event.category === category);
                        if(listings.length === 0) {
                            return
                        }
                        return (
                            <React.Fragment key={index}>
                                <Row>
                                    <ListingCardHeader title={category} />
                                    <ListingCardContainer
                                        listings={listings} 
                                    />
                                </Row>
                                
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

export default Estate;