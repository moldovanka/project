import React from "react";
import { Container, Row, Col } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import ProfileDetails from './Components/Component/ProfileDetails/ProfileDetails';
import SavedContainer from './Components//Component/Saved/SavedContainer';
import DashboardHeaderContainer from "./Components/DashboardHeader/DashboardHeaderContainer";
import DashboardPanelContainer from "./Components/DashboardPanel/DashboardPanelContainer";
import ActivityContainer from "./Components/Component/Activity/ActivityContainer";
import ChangeUserDetailsContainer from './Components/Component/ChangeUserDetails/ChangeUserDetailsContainer';
import FollowersContainer from './Components/Component/Follow/FollowersContainer';
import FollowingContainer from './Components/Component/Follow/FollowingContainer';
import MyListingsContainer from './Components/Component/MyListings/MyListingsContainer';
const DashBoadrd = props => {
    const panel = [
        {
            name: "Activity",
            url: `${props.match.url}`
        },
        {
            name: "Profile Details",
            url: `${props.match.url}/profile`
        },
        {
            name: "My Listings",
            url: `${props.match.url}/listings`
        },
        {
            name: "Favorite Listings",
            url: `${props.match.url}/favorite`
        },
        {
            name: "Followers",
            url: `${props.match.url}/followers`
        },
        {
            name: "Following",
            url: `${props.match.url}/following`
        },
        {
            name: "Change Profile",
            url: `${props.match.url}/change_profile`
        },
    ]
    return (
        <section>
            <Container>
                <Row>
                    <DashboardHeaderContainer 
                        currentUser={props.user._id}
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
                            currentUserID={props.user._id} 
                            avatar={props.user.info.avatar}
                        />} />
                        <Route path={`${props.match.url}/profile`} render={() => 
                            <ProfileDetails
                                email={props.user.email} 
                                {...props.user.info}
                            />} />
                        <Route path={`${props.match.url}/listings`} render={() => 
                            <MyListingsContainer 
                                userID={props.user._id}
                            />} />
                        <Route path={`${props.match.url}/favorite`} render={() => 
                            <SavedContainer 
                                userID={props.user._id}
                            />} />
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
                        <Route path={`${props.match.url}/change_profile`} render={() => 
                            <ChangeUserDetailsContainer />} />
                       </Switch>
                    </Col>
                    
                </Row>
            </Container>
        </section>
    )
}


export default DashBoadrd;