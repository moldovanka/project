import React from "react";
import ListingCardContainer from "../../../ListingCard/ListingCardContainer";
import NotFoundItem from "../../../../../../NotFoundItem";
import Preloader from "../../../../../../../Preloader";
import { Row } from 'reactstrap';

const Others = props => {
    return (
        <section className="home_section">
            {props.listings ? (
                props.listings.length === 0 ? (
                    <NotFoundItem />
                ) : (
                    <Row>
                        <ListingCardContainer
                            listings={props.listings} 
                        />
                    </Row>
                )
            ) : (
                <Preloader />
            )}
        </section>
    )
}

export default Others;