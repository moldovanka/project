import React from "react";
import "./HomePanel.css";
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export const homePanel = ["All", "Places", "Events", "Estate", "Vehicles", "Electronics", "Others"];

const HomePanel = props => {
    
    return(
        <Row>
            <Col xl={12}>
                <div className="home_panel_box">
                    <ul className="home_panel">
                        {homePanel.map((item, index) => {
                            return(
                                <li key={index}>
                                    <Link to="#" 
                                        onClick={() => props.setPanel(index)}
                                        className={props.panel === index ? "active" : ""}
                                    >
                                    {item}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Col>
        </Row>
    )
}

export default HomePanel;