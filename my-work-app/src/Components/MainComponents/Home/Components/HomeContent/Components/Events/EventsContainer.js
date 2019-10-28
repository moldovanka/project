import React, {useState, useEffect} from "react";
import { listingAPI } from "../../../../../../../api/api";
import Events from "./Events";

const EventsContainer = props => {
    const options = {
        section: "events"
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
        <Events 
            listings={listings}
        />
    )
}

export default EventsContainer;