import React from "react";
import { Redirect } from 'react-router-dom';


const NoMatch = props => {
    return(
        <>
            <Redirect to="/login" />
        </>
    )
}

export default NoMatch;