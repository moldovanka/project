import React from "react";
import "./DashboardPanel.css";
import { Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { exact } from "prop-types";

const DashboardPanel = props => {
    return (
        <Col md={12}>
            <div className="dashboard_panel_box">
                {props.panel.map((panel, index) => {
                    return(
                        <NavLink
                            exact={index === 0 && true} 
                            key={index} 
                            to={panel.url} 
                            className="dashboard_panel_item" 
                            activeClassName="active"
                        >
                        {panel.name}
                        </NavLink>
                    )
                })}
            </div>
        </Col>
    )
}

export default DashboardPanel;