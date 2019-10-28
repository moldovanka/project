import React, {useState, useEffect} from "react";
import AllListings from "./AllListings";
import { listingAPI } from "../../../../../../../api/api";

const AllListingsContainer = props => {
    const [listings, setListings] = useState(undefined);
    useEffect(() => {
        listingAPI.getListings()
            .then(res => {
                if(res.data.status === 200) {
                    setListings(res.data.result)
                }
            })
    }, [])
    return (
        <AllListings 
            listings={listings}
        />
    )
}

export default AllListingsContainer;