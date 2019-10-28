import React from "react";
import "./Sidebar.css";
import { Divider } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink } from 'react-router-dom';


const SideBar = props => {
    const handleClose = e => {
        const screeWidth = window.innerWidth;
        if(screeWidth < 576) {
            props.setToggleMenu(false)
        }
    }
    return(
        <aside className={`sidebar_box ${props.toggleMenu ? "min": ""}`}>
            <div className="sidebar_section" onClick={handleClose}>
                <NavLink exact to="/" className="sidebar_section_link" activeClassName="sidebar_section_link_active">
                    <HomeIcon className="sidebar_section_icon"/>
                    <span className="sidebar_section_name">Home</span>
                </NavLink>
            </div>
            <div className="sidebar_section" onClick={handleClose}>
                <NavLink to="/listings" className="sidebar_section_link" activeClassName="sidebar_section_link_active">
                    <ListAltIcon className="sidebar_section_icon"/>
                    <span className="sidebar_section_name">Listing</span>
                </NavLink>
            </div>
            <div className="sidebar_section" onClick={handleClose}>
                <NavLink to="/profiles" className="sidebar_section_link" activeClassName="sidebar_section_link_active">
                    <PeopleIcon className="sidebar_section_icon"/>
                    <span className="sidebar_section_name">Find Profiles</span>
                </NavLink>
            </div>
            <Divider className="sidebar_deliver"/>
            <div className="sidebar_section" onClick={handleClose}>
                <NavLink to="/dashboard" className="sidebar_section_link" activeClassName="sidebar_section_link_active">
                    <AccountCircleIcon className="sidebar_section_icon"/>
                    <span className="sidebar_section_name">DashBoard</span>
                </NavLink>
            </div>
            <div className="sidebar_section" onClick={handleClose}>
                <NavLink to="/messages" className="sidebar_section_link" activeClassName="sidebar_section_link_active">
                    <ForumIcon className="sidebar_section_icon"/>
                    <span className="sidebar_section_name">Messages</span>
                </NavLink>
            </div>
            <div className="sidebar_section" onClick={handleClose}>
                <NavLink to="/settings" className="sidebar_section_link" activeClassName="sidebar_section_link_active">
                    <SettingsIcon className="sidebar_section_icon"/>
                    <span className="sidebar_section_name">Settings</span>
                </NavLink>
            </div>
            <Divider className="sidebar_deliver"/>
            <div className="sidebar_section" onClick={handleClose}>
                <NavLink to="/help" className="sidebar_section_link" activeClassName="sidebar_section_link_active">
                    <HelpOutlineIcon className="sidebar_section_icon"/>
                    <span className="sidebar_section_name">Help</span>
                </NavLink>
            </div>
        </aside>
    )
}
export default SideBar;