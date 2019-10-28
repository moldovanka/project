import React, {useEffect, useState} from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
import ListingContainer from './Components/MainComponents/Listing/ListingContainer';
import Help from './Components/MainComponents/Help/Help';
import { connect } from 'react-redux';
import SettingsContainer from './Components/MainComponents/Settings/SettingsContainer';
import UserInfoContainer from './Components/MainComponents/UserInfo/UserInfoContainer';
import Preloader from './Preloader';
import MessagesContainer from './Components/MainComponents/Messages/MessagesContainer';
import { getUserData } from './redux/user-reducer';
import Header from './Components/Header/Header';
import DashboardContainer from './Components/MainComponents/Dashboard/DashboardContainer';
import UsersContainer from './Components/MainComponents/Users/UsersContainer';
import { authUser } from './redux/auth-reducer';
import AddListingsContainer from './Components/MainComponents/AddListings/AddListingsContainer';
import ListingInfoContainer from './Components/MainComponents/ListingInfo/ListingInfoContainer';
import Home from './Components/MainComponents/Home/Home';
import openSocket from 'socket.io-client';
import { SERVER_URL } from './assets/Server_URL';

function Social(props) {
    const socket = openSocket(SERVER_URL);
    const [toggleMenu, setToggleMenu] = useState(false);
    useEffect(() => {
        if(localStorage.getItem("currentUser")) {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            props.getUser(user._id);
            props.auth();
        }
    }, [])
    useEffect(() => {
        window.addEventListener("unload", () => {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            socket.emit('leave', { user: user._id });
        })
    }, [])
  return (
    <>
        {!localStorage.getItem("currentUser") && <Redirect to="/login" />}
        {props.isAuth ? (
            <>
            <Header
                toggleMenu={toggleMenu} 
                setToggleMenu={setToggleMenu}
            />
            <div className="app-body-wrapped">
                <SideBar 
                    toggleMenu={toggleMenu}
                    setToggleMenu={setToggleMenu}
                 />
                <section className={`main_section ${toggleMenu ? "min" : ""}`}>
                    <Switch>
                        <Route exact path = "/" component={Home} />
                        <Route path="/listings" component={ListingContainer}/>
                        <Route path="/profiles" component={UsersContainer} />
                        <Route path="/messages" component={MessagesContainer}/>
                        <Route path="/dashboard" component={DashboardContainer} />
                        <Route path="/user/:id" component={UserInfoContainer} />
                        <Route path="/help" component={Help} />
                        <Route path="/add_listing" component={AddListingsContainer} />
                        <Route path="/event/:id" component={ListingInfoContainer} />
                        <Route path="/settings" component={SettingsContainer} />
                    </Switch>
                </section>
            </div>
            </>
        ) : (
            <div className="modal_loader">
                    <Preloader />
            </div>
        )}
    </>
  );
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getUser: user => dispatch(getUserData(user)),
        auth: () => dispatch(authUser()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Social);