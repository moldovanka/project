import React, {useEffect} from "react";
import Settings from "./Settings";

const SettingsContainer = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    return (
        <Settings />
    )
}

export default SettingsContainer;