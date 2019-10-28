import React, {useState, useEffect} from "react";
import "./UserHeaderPanel.css";
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const UserHeaderPanel = props => {
    const [toggleUserMenu, setToggleUserMenu] = useState(false);
    useEffect(() => {
        document.addEventListener("click", handleClickOutSide, false)
        function handleClickOutSide(e) {
            const panelBlock = document.getElementsByClassName("user_header_panel_block")[0];
            const menuBlock = document.getElementsByClassName("user_header_panel_menu")[0];
            if(!e.path.includes(menuBlock) && !e.path.includes(panelBlock)) {
                setToggleUserMenu(false)
            }
        }
        return () => {
            document.removeEventListener("click", handleClickOutSide, false)
        }
    })
    const handleToggleMenu = () => {
        setToggleUserMenu(!toggleUserMenu)
    }
    return (
        <div className="user_header_panel_block">
            <AccountCircleIcon onClick={handleToggleMenu} className="user_header_panel_icon"/>
            <p onClick={handleToggleMenu} className="user_header_panel_name">{props.userName || "User"}</p>
            {toggleUserMenu && 
            <div className="user_header_panel_menu">
                <div onClick={handleToggleMenu}><Link to="/dashboard">My Profile</Link></div>
                <div onClick={handleToggleMenu}><Link to="/messages">Messages</Link></div>
                <div onClick={handleToggleMenu}><Link to="/help">Help</Link></div>
                <div onClick={handleToggleMenu}><Link to="/settings">Setting</Link></div>
                <div><Link to="#" onClick={props.logOut}>Logout</Link></div>
            </div>
            }
            
        </div>
    )
}

export default UserHeaderPanel;