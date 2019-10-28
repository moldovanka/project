import React from "react";
import { Container, Row, Col } from 'reactstrap';
import ProfileDetails from "../Dashboard/Components/Component/ProfileDetails/ProfileDetails";
import DashboardHeaderContainer from "../Dashboard/Components/DashboardHeader/DashboardHeaderContainer";
import DashboardPanelContainer from "../Dashboard/Components/DashboardPanel/DashboardPanelContainer";
import ActivityContainer from "../Dashboard/Components/Component/Activity/ActivityContainer";
import { Route, Switch } from 'react-router-dom';
import FollowingContainer from "../Dashboard/Components/Component/Follow/FollowingContainer";
import FollowersContainer from "../Dashboard/Components/Component/Follow/FollowersContainer";
import MyListingsContainer from './../Dashboard/Components/Component/MyListings/MyListingsContainer';

const UserInfo = props => {
    let panel;
    switch(props.user.settings.privacy.friends) {
        case "everyone": {
            panel = [
                {
                    name: "Activity",
                    url: `${props.match.url}`
                },
                {
                    name: "Profile Details",
                    url: `${props.match.url}/profile`
                },
                {
                    name: "Listings",
                    url: `${props.match.url}/listings`
                },
                {
                    name: "Followers",
                    url: `${props.match.url}/followers`
                },
                {
                    name: "Following",
                    url: `${props.match.url}/following`
                },
            ]
            break;
        }
        case "friends": {
            panel = props.user.info.following.includes(props.currentUser._id) ? [
                {
                    name: "Activity",
                    url: `${props.match.url}`
                },
                {
                    name: "Profile Details",
                    url: `${props.match.url}/profile`
                },
                {
                    name: "Listings",
                    url: `${props.match.url}/listings`
                },
                {
                    name: "Followers",
                    url: `${props.match.url}/followers`
                },
                {
                    name: "Following",
                    url: `${props.match.url}/following`
                },
            ] : [
                {
                    name: "Activity",
                    url: `${props.match.url}`
                },
                {
                    name: "Profile Details",
                    url: `${props.match.url}/profile`
                },
                {
                    name: "Listings",
                    url: `${props.match.url}/listings`
                },
            ]
            break;
        }
        case "me": {
            panel = [
                {
                    name: "Activity",
                    url: `${props.match.url}`
                },
                {
                    name: "Profile Details",
                    url: `${props.match.url}/profile`
                },
                {
                    name: "Listings",
                    url: `${props.match.url}/listings`
                },
            ]
            break;
        }
    }
    return(
        <section>
            <Container>
                <Row>
                    <DashboardHeaderContainer
                        currentUser={props.currentUser._id}
                        _id={props.user._id}
                        name={props.user.info.name}
                        avatar={props.user.info.avatar}
                        country={props.user.info.country}
                        region={props.user.info.region}
                        listings={props.user.info.listings}
                        followers={props.user.info.followers}
                        following={props.user.info.following}
                    />
                    <DashboardPanelContainer 
                        panel={panel}
                    />
                    <Col md={12}>
                    <Switch>
                        <Route exact path={`${props.match.url}/`} render={() => 
                            <ActivityContainer 
                            userID={props.user._id}
                            currentUserID={props.currentUser._id} 
                            avatar={props.currentUser.info.avatar}
                        />} />
                        <Route path={`${props.match.url}/profile`} render={() => 
                            <ProfileDetails
                                email={props.user.email} 
                                privacyEmail={props.user.settings.privacy.email}
                                currentUser={props.currentUser._id}
                                {...props.user.info}
                            />} />
                        <Route path={`${props.match.url}/listings`} render={() => 
                            <MyListingsContainer
                                userID={props.user._id}
                            />} />
                        {props.user.settings.privacy.friends === "everyone" && 
                            <>
                                <Route path={`${props.match.url}/followers`} render={() => 
                                    <FollowersContainer
                                        title="Followers"
                                        userID={props.user._id} 
                                    />} />
                                <Route path={`${props.match.url}/following`} render={() => 
                                    <FollowingContainer
                                        title="Following" 
                                        userID={props.user._id} 
                                    />} />
                            </>
                        }
                        {props.user.settings.privacy.friends === "friends" && props.user.info.following.includes(props.currentUser._id) &&
                            <>
                                <Route path={`${props.match.url}/followers`} render={() => 
                                    <FollowersContainer
                                        title="Followers"
                                        userID={props.user._id} 
                                    />} />
                                <Route path={`${props.match.url}/following`} render={() => 
                                    <FollowingContainer
                                        title="Following" 
                                        userID={props.user._id} 
                                    />} />
                            </>
                        }
                       </Switch>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default UserInfo; 