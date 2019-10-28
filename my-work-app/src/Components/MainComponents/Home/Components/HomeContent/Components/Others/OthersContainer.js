import React, {useState, useEffect} from "react";
import { listingAPI } from "../../../../../../../api/api";
import Others from "./Others";

const OthersContainer = props => {
    const options = {
        section: "others"
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
        <Others 
            listings={listings}
        />
    )
}

export default OthersContainer;