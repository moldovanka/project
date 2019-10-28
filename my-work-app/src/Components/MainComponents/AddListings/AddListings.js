import React from "react";
import "./AddListings.css";
import { Container, Row, Col } from 'reactstrap';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ListIcon from '@material-ui/icons/List';
import AddListingsItem from "./AddListingsItem";

const AddListings = props => {
    const addListingsItems = [
        {
            title: "01. Places & Events",
            items: ["Place", "Event"],
            itemsIcon: [<HomeIcon />, <EventIcon />],
            url: [`${props.match.url}/place`,`${props.match.url}/event`]
        },
        {
            title: "02. Real Estate",
            items: ["Sell/Rent"],
            itemsIcon: [<HomeIcon />],
            url: [`${props.match.url}/estate`]
        },
        {
            title: "03. Cars & Bikes",
            items: ["Sell/Rent"],
            itemsIcon: [<DirectionsCarIcon />],
            url: [`${props.match.url}/vehicle`]
        },
        {
            title: "04. Electronic",
            items: ["Sell"],
            itemsIcon: [<PhoneAndroidIcon />],
            url: [`${props.match.url}/electronic`]
        },
        {
            title: "05. Others",
            items: ["Sell"],
            itemsIcon: [<ListIcon />],
            url: [`${props.match.url}/other`]
        },
    ]
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div className="add_listings_header">
                        <p>Add a Listing</p>
                        <div className="deliver"></div>
                    </div>
                </Col>
                {addListingsItems.map((item, index) => {
                    return (
                        <AddListingsItem
                            key={index} 
                            {...item}
                        />
                    )
                })}
            </Row>
        </Container>
    )
}

export default AddListings;