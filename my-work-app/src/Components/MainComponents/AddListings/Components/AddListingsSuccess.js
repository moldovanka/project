import React, {useEffect, useState} from "react";
import "./../AddListings.css";
import Preloader from "../../../../Preloader";
import { Redirect } from 'react-router-dom';

const AddListingsSuccess = props => {
    const [timer, setTimer] = useState(5);
    useEffect(() => {
        let timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID)
            if(timer === 0) {
                props.uploadingStatus();
            }
        }
    })
    function tick() {
        setTimer(timer - 1)
    }
    return (
        <>
            {timer === 0 && <Redirect to="/" />}
            <div className="add_listings_success">
                <p>Listing has been added</p>
                <p>You will be redirected to main page in {timer} seconds</p>
                <Preloader />
            </div>
        </>
    )
}

export default AddListingsSuccess;