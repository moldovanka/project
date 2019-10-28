import React from "react";
import { Container, Row, Col } from 'reactstrap';
import ListingInfoPanelTabs from "./Components/ListingInfoPanelTabs/ListingInfoPanelTabs";
import { Route } from 'react-router-dom';
import ListingInfoDetails from "./Components/ListingInfoDetails/ListingInfoDetails";
import ListingInfoGallery from "./Components/ListingInfoGallery/ListingInfoGallery";
import ListingInfoComments from "./Components/ListingInfoComments/ListingInfoComments";

const ListingInfoPanel = props => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <ListingInfoPanelTabs 
                        panelURI={props.panelURI}
                    />
                </Col>
                <Col md={12}>
                    <Route exact path={props.panelURI} render={() => 
                        <ListingInfoDetails 
                            listing={props.listing}
                        />} 
                    />
                    <Route path={props.panelURI + "/gallery"} render={() => 
                        <ListingInfoGallery 
                            gallery={props.listing.event.images.galleryImages}
                        />
                    }/>
                    <Route path={props.panelURI + "/comments"} render={() => 
                        <ListingInfoComments 
                            listingID={props.listingID}
                        />
                    }/>
                </Col>
            </Row>
        </Container>
    )
}

export default ListingInfoPanel;