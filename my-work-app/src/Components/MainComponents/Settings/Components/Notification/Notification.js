import React from "react";
import "./Notification.css";
import { Row, Col } from 'reactstrap';
import { FormGroup, Switch, withStyles } from "@material-ui/core";

const Notification = props => {
    const CustomSwitch = withStyles({
        
    })(props => <Switch {...props} />)

    const handleChange = e => {
        const notification = props.settings;
        let key = e.currentTarget.name;
        notification[key] = !notification[key];
        props.setNotifications(notification);
    }

    return(
        <section className="dashboard_sections">
            <Row>
                <Col md={12}>
                    <div className="notification_box">
                        <FormGroup>
                            <div className="notification_item_box">
                                <p>Activity on my listings</p>
                                <CustomSwitch
                                    color="secondary"
                                    name="listings"
                                    checked={props.settings.listings}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="notification_item_box">
                                <p>Someone follow me</p>
                                <CustomSwitch
                                    color="secondary"
                                    name="follow"
                                    checked={props.settings.follow}
                                    onChange={handleChange}
                                />
                            </div>
                        </FormGroup>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default Notification;