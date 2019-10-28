import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import Saved from './Saved';
import { listingAPI } from "../../../../../../api/api";
import { removeFavoriteListing } from "../../../../../../redux/user-reducer";

const SavedContainer = props => {
    const [listings, setListings] = useState(undefined);
    useEffect(() => {
        if(props.userID !== "") {
            listingAPI.getUserSavedListings(props.userID)
            .then(res => {
                if(res.data.status === 200) {
                    setListings(res.data.listings);
                }
            })
        }
    }, [props.userID, props.savedListing.length])
    return(
        <Saved 
            listings={listings}
            {...props}
        />
    )
}

let mapStateToProps = state => {
    return {
        savedListing: state.userReducer.info.savedListings,
    }
}
let mapDispatchToProps = dispatch => {
    return {
        delete: listing => dispatch(removeFavoriteListing(listing))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedContainer)