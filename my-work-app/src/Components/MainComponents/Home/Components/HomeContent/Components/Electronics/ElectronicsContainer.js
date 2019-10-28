import React, {useState, useEffect} from "react";
import { listingAPI } from "../../../../../../../api/api";
import Electronics from "./Electronics";

const ElectronicsContainer = props => {
    const options = {
        section: "electronics"
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
        <Electronics 
            listings={listings}
        />
    )
}

export default ElectronicsContainer;