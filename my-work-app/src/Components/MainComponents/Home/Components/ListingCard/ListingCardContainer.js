import React from "react";
import { connect } from 'react-redux';
import ListingCard from "./ListingCard";
import { addFavoriteListing } from "../../../../../redux/user-reducer";

const ListingCardContainer = props => {
    return (
        <ListingCard 
            {...props}
        />
    )
}
let mapStateToProps = state => {
    return {
        saved: state.userReducer.info.savedListings
    }
}
let mapDispatchToProps = dispatch => {
    return {
        save: listing => dispatch(addFavoriteListing(listing))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListingCardContainer)