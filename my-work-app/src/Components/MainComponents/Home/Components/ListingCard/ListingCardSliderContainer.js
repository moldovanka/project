import React from "react";
import { connect } from 'react-redux';
import { addFavoriteListing } from "../../../../../redux/user-reducer";
import ListingCardSlider from './ListingCardSlider';

const ListingCardSliderContainer = props => {
    return (
        <ListingCardSlider 
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
export default connect(mapStateToProps, mapDispatchToProps)(ListingCardSliderContainer)