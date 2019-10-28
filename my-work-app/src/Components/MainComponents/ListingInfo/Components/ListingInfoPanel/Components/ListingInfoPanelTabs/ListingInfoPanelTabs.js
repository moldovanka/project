import React from "react";
import "./../../../../ListingInfo.css";
import { NavLink } from 'react-router-dom';

const ListingInfoPanelTabs = props => {
    const routes = [
        {
            name: "Details",
            url: props.panelURI
        },
        {
            name: "Gallery",
            url: props.panelURI + "/gallery"
        },
        {
            name: "Comments",
            url: props.panelURI + "/comments"
        }
    ]
    return(
        <ul className="listing_info_panel">
            {routes.map((route, index) => {
                return (
                    <li key={index}>
                        <NavLink 
                            exact={index === 0 ? true : false}
                            to={route.url} 
                            className="listing_info_panel_link" 
                            activeClassName="listing_info_panel_link_active"
                        >
                            {route.name}
                        </NavLink>
                    </li>
                )
            })}
            
        </ul>
    )
}

export default ListingInfoPanelTabs;