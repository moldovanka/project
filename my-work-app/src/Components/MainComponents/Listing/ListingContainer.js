import React, {useState, useEffect} from "react"
import Listing from './Listing';
import { listingAPI } from "../../../api/api";


const ListingContainer = props => {
    const [isSearch, setIsSearch] = useState(false);
    const [options, setOptions] = useState();
    const [listings, setListings] = useState(undefined);
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    useEffect(() => {
        listingAPI.getListings(options)
            .then(res => {
                if(res.data.status === 200) {
                    setListings(res.data.result)
                    setIsSearch(false)
                }
            })
    }, [options])
    return (
        <Listing
            isSearch={isSearch}
            search={setIsSearch}
            listings={listings}
            options={setOptions}
        />
    )
}

export default ListingContainer