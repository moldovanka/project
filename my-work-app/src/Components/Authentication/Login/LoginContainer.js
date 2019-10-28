import React from "react";
import Login from "./Login"
import { getAuthUser } from "../../../redux/auth-reducer";
import { authAPI } from './../../../api/api';
import Preloader from './../../../Preloader';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginContainer = props => {
    const [data, setData] = React.useState(undefined);
    const [loginError, setloginError] = React.useState({error: false, message: ""});
    const [isLogin, setIsLogin] = React.useState(false);
    const [user, setUser] = React.useState(undefined);
    const [redirect, setRedirect] = React.useState(false);
    React.useEffect(() => {
        if(isLogin === true) {
            setTimeout(() => {
                props.getAuthUser(user)
                setRedirect(true);
            }, 1500);
        }
    }, [isLogin])
    React.useEffect(() => {
        if(data) {
            authAPI.login(data)
                .then(response => {
                    if(response.data.status === 200) {
                        setUser(response.data.user)
                        setIsLogin(true);
                    } else {
                        const error = {
                            error: true, 
                            message: response.data.message
                        }
                        setloginError(error);
                    }
                })
        }
    }, [data])
    return(
        <>
            {redirect && <Redirect to="/" />}
            <Login 
                setError={loginError}
                setLoginData={setData}
            />
            <div className={isLogin ? "modal_loader" : "hidden"}>
                    <Preloader />
            </div>
        </>
    )
}

export default connect(null,{getAuthUser})(LoginContainer);