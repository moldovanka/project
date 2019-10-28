import React, {useState, useEffect} from "react";
import Places from "./Places";
import { listingAPI } from "../../../../../../../api/api";

const PlacesContainer = props => {
    const options = {
        section: "places"
    }
    const [listings, setListings] = useState(undefined);
    useEffect(() => {
        listingAPI.getListings(options)
            .then(res => {
                if(res.data.status === 200) {
                    setListings(res.data.result)
                }
            })
    }, [])
    return (
        <Places 
            listings={listings}
        />
    )
}

export default PlacesContainer;