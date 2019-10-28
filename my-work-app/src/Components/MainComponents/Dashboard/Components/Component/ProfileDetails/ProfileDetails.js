import React from "react";
import "./ProfileDetails.css";
import { Container, Row, Col } from 'reactstrap';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Link } from 'react-router-dom';
import ProfileDetail from "./ProfileDetail";

const ProfileDetails = props => {
    return(
        <section className="dashboard_sections">
            <Container>
                <Row>
                    <Col md={6}>
                    {props.about !== "" &&
                        <ProfileDetail
                            title="About"
                        >
                            {props.about}
                        </ProfileDetail>
                    } 
                        
                        <ProfileDetail
                            title="Location"
                        >
                            <Map
                                google={props.google}
                                zoom={14}
                                style={{height: 250, position: 'relative'}}
                                initialCenter={{
                                    lat: props.location.lat,
                                    lng: props.location.lng
                                }}
                                className="profile_details_map">
                                <Marker
                                    title={'Me'}
                                    name={'TEST'}
                                    position={{lat: props.location.lat, lng: props.location.lng}} />
                            </Map>
                        </ProfileDetail>
                        {props.address !== "" && 
                            <ProfileDetail
                                title="Address"
                            >
                                {props.address}
                            </ProfileDetail>
                        }
                        
                    </Col>
                    <Col md={6}>
                    {props.privacyEmail === "everyone" && 
                        props.email !== "" && 
                            <ProfileDetail
                                title="Email Address"
                            >
                            {props.email}
                            </ProfileDetail>
                    }
                    {props.privacyEmail === "friends" && props.following.includes(props.currentUser) &&
                        props.email !== "" && 
                            <ProfileDetail
                                title="Email Address"
                            >
                            {props.email}
                            </ProfileDetail>
                    }
                    {props.phone !== "" && 
                        <ProfileDetail
                            title="Phone Number"
                        >
                            <Link to={`tel:${props.phone}`} className="profile_details_link">{props.phone}</Link>
                        </ProfileDetail>
                    } 
                    {props.website !== "" && 
                        <ProfileDetail
                            title="Website"
                        >
                            <Link to={props.website} target="_blank" className="profile_details_link">{props.website}</Link>
                        </ProfileDetail>
                    } 
                    {props.socials.length !== 0 && 
                        <ProfileDetail
                            title="Follow Us"
                        >
                            {props.socials.map((social, index) => {
                                return (
                                    <div className="profile_details_socials" key={index}>
                                        <span>{social.social}:</span>
                                        <a href={social.url} target="_blank">{social.url}</a>
                                    </div>
                                )
                            })}
                        </ProfileDetail>
                    }
                    {props.region !== "" && 
                        <ProfileDetail
                            title="Region"
                        >
                           <p style={{textTransform: "capitalize"}}>{props.region}</p>
                        </ProfileDetail>
                    }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBx2kozSl_rPWWS9cB1GEuxH1cwq_ckF4s",
})(ProfileDetails);