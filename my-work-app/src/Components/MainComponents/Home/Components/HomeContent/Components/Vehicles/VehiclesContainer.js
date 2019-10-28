import React, {useState, useEffect} from "react";
import { listingAPI } from "../../../../../../../api/api";
import Vehicles from "./Vehicles";

const VehiclesContainer = props => {
    const options = {
        section: "vehicles"
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
        <Vehicles 
            listings={listings}
        />
    )
}

export default VehiclesContainer;