import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { listingAPI } from "../../../../../../api/api";
import { removeListing } from "../../../../../../redux/events-reducer";
import MyListings from './../MyListings/MyListings';

const MyListingsContainer = props => {
    const [listings, setListings] = useState(undefined);
    useEffect(() => {
        if(props.userID !== "") {
            listingAPI.getUserListings(props.userID)
            .then(res => {
                if(res.data.status === 200) {
                    setListings(res.data.listings);
                }
            })
        }
    }, [props.userID, props.mylistings.length])
    return(
        <MyListings
            listings={listings}
            {...props}
        />
    )
}

let mapStateToProps = state => {
    return {
        currentUserID: state.userReducer._id,
        mylistings: state.userReducer.info.listings
    }
}
let mapDispatchToProps = dispatch => {
    return {
        delete: listing => dispatch(removeListing(listing))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyListingsContainer)