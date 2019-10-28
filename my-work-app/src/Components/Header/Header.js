import React, {useEffect, useState} from "react";
import "./Header.css";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import HomeIcon from '@material-ui/icons/Home';
import NotificationEventsContainer from './Components/Notitfications/NotificationEvents/NotificationEventsContainer';
import NotitficationMessagesContainer from "./Components/Notitfications/NotitficationMessages/NotitficationMessagesContainer";
import UserHeaderPanelContainer from "./Components/UserHeaderPanel/UserHeaderPanelContainer";

const useStyles = makeStyles(theme => ({
    search_root: {
        marginLeft: "7px"
    },
    search_input: {
        color: "#bdc3d3",
        fontSize: "12px",
        lineHeight: "2",
    },
}));

const Header = props => {
    
    const classes = useStyles();
    return(
        <header className="header">
            <div className="header_blocks">
                <div>
                    <MenuIcon className="header_hamburger" onClick={() => props.setToggleMenu(!props.toggleMenu)}/>
                </div>
                <div>
                    <Link to="/">
                        <img src="https://i.ibb.co/W64Yc3W/Moldovanka.png" alt="logo" className="header_logo"></img>
                    </Link>
                </div>
                <div className="header_blocks search">
                    <div>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search Places, Events, House, Shop, Bike, Car, Mobile etc..."
                        className="header_search"
                        classes={{
                            root: classes.search_root,
                            input: classes.search_input
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </div>
            <div className="header_blocks">
                <div>
                    <Link to="/add_listing" className="header_btn">
                        <AddIcon className="header_btn_icon"/>
                        Add Listing
                    </Link>
                </div>
                <ul className="header_notification_list">
                    <li>
                        <Link to="/">
                            <HomeIcon className="badge_notification_icon"/>
                        </Link>
                    </li>
                    <li>
                        <NotitficationMessagesContainer />
                    </li>
                    <li>
                        <NotificationEventsContainer />
                    </li>
                </ul>
                <UserHeaderPanelContainer />
            </div>
            {/* <Row>
                <Col xs={2} className="header_blocks">
                    <div>
                        <MenuIcon className="header_hamburger" />
                    </div>
                    <div>
                        <Link to="/">
                            <img src="https://i.ibb.co/W64Yc3W/Moldovanka.png" alt="logo" className="header_logo"></img>
                        </Link>
                    </div>
                </Col>
                <Col sm={4} className="header_blocks">
                        <Col sm={1}>
                            <div>
                                <SearchIcon />
                            </div>
                        </Col>
                        <Col sm={11}>
                            <InputBase
                                placeholder="Search Places, Events, House, Shop, Bike, Car, Mobile etc..."
                                classes={{
                                    root: classes.search_root,
                                    input: classes.search_input
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Col>
                </Col>
                <Col xs={10} sm={10} md={6} className="header_blocks">
                    <Col sm={3}>
                        <div>
                            <Link to="/add_listing" className="header_btn">
                                <AddIcon className="header_btn_icon"/>
                                Add Listing
                            </Link>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <div>
                            <ul className="header_notification_list">
                                <li>
                                    <Link to="/">
                                        <HomeIcon className="badge_notification_icon"/>
                                    </Link>
                                </li>
                                <li>
                                    <NotitficationMessagesContainer />
                                </li>
                                <li>
                                    <NotificationEventsContainer />
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <UserHeaderPanelContainer />
                    </Col>
                </Col>
            </Row> */}
        </header>
    )
}
export default Header;