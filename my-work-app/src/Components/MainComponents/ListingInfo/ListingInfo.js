import React from "react";
import Preloader from './../../../Preloader';
import ListingInfoHeader from "./Components/ListingInfoHeader/ListingInfoHeader";
import ListingInfoAuthor from "./Components/ListingInfoAuthor/ListingInfoAuthor";
import ListingInfoPanel from "./Components/ListingInfoPanel/ListingInfoPanel";
const ListingInfo = props => {
    return (
        <>
            {props.listing ? (
                <>
                    <ListingInfoHeader 
                        coverImage={props.listing.event.images.coverImage}
                        logo={props.listing.event.images.logo}
                        name={props.listing.event.name}
                        rating={props.listing.event.rating}
                        phone={props.listing.event.phone}
                    />
                    <ListingInfoAuthor 
                        {...props.listing.user}
                        createDialog={props.createDialog}
                        currentUserID={props.currentUserID}
                    />
                    <ListingInfoPanel 
                        listingID={props.match.params.id}
                        panelURI={props.match.url}
                        {...props}
                    />
                </>
            ) : (
                <Preloader />
            )}
        </>
    )
}

export default ListingInfo;