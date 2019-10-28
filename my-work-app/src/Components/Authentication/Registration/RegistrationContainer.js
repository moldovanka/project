import React from "react";
import Registration from "./Registration";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Preloader from './../../../Preloader';
import { authAPI } from './../../../api/api';

const RegistrationContainer = props => {
    const [data, setData] = React.useState(undefined);
    const [isRegister, setIsRegister] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [registerError, setregisterError] = React.useState({error: false, message: ""});
    React.useEffect(() => {
        if(isRegister === true) {
            setTimeout(() => {
                setRedirect(true)
            }, 1500);
        }
    }, [isRegister])
    React.useEffect(() => {
        if(data) {
            authAPI.register(data)
                .then(response => {
                    if(response.data.status === 200) {
                        setIsRegister(true);
                    } 
                    else if(response.data.status === 400) {
                        const error = {
                            error: true, 
                            message: response.data.message
                        }
                        setregisterError(error)
                    }
                    
                })
        }
    }, [data])
    return(
        <>
            {redirect && <Redirect to="/login" />}
            <Registration 
                registration={setData}
                setError={registerError}
            />
            <div className={isRegister ? "modal_loader" : "hidden"}>
                <Preloader />
            </div>
        </>
    )
}

export default connect()(RegistrationContainer);