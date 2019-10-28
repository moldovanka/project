import React from "react";
import "./Settings.css";
import { Container, Row, Col } from 'reactstrap';
import { makeStyles } from "@material-ui/styles";
import PrivacyContainer from './Components/Privacy/PrivacyContainer';
import NotificationContainer from './Components/Notification/NotificationContainer';
import ChangePasswordContainer from "./Components/ChangePassword/ChangePasswordContainer";
import DeactivateAccountContainer from './Components/DeactivateAccount/DeactivateAccountContainer';
import SettingsPanel from './SettingsPanel/SettingsPanel';

const Settings = props => {
    const [selectedPanel, setPanel] = React.useState(0);
    let panel;
    switch(selectedPanel) {
        case 0: {
            panel = <PrivacyContainer />
            break;
        }
        case 1: {
            panel = <NotificationContainer />
            break;
        }
        case 2: {
            panel = <ChangePasswordContainer />
            break;
        }
        case 3: {
            panel = <DeactivateAccountContainer />
            break;
        }
    }
    return(
        <section>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="settings_header">
                            <h3>Settings</h3>
                            <div className="deliver"></div>
                        </div>
                    </Col>
                    <SettingsPanel
                        activePanel={selectedPanel}
                        setPanel={setPanel}
                    />
                    <Col md={12}>
                        {panel}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Settings;