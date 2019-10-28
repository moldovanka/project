import React from "react"
import "./../Settings.css";
import { Col } from 'reactstrap';
const SettingsPanel = props => {
    const panelItems = ["Privacy", "Notification", "Change Password", "Deactivate account"];
    return(
        <Col md={12}>
            <div className='settings_panel'>
                {panelItems.map((panel, index) => {
                    return(
                        <div 
                            key={index}
                            className={`settings_panel_item ${index === props.activePanel && "active"}`}
                            onClick={() => props.setPanel(index)}
                        >
                            {panel}
                        </div>
                    )
                })}
            </div>
        </Col>
    )
}

export default SettingsPanel;