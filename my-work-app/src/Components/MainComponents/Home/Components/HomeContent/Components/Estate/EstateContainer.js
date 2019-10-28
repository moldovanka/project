import React, {useState, useEffect} from "react";
import { listingAPI } from "../../../../../../../api/api";
import Estate from "./Estate";

const EstateContainer = props => {
    const options = {
        section: "estate"
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
        <Estate 
            listings={listings}
        />
    )
}

export default EstateContainer;