import React from "react";
import loader from './assets/loader.svg';

const Preloader = props => {
    return (
        <img src={loader} alt="loader" className="loader"></img>
    )
}

export default Preloader;