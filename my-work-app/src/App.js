import React, { useEffect } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import {Provider, connect} from "react-redux";
import store from './redux/redux-store';
import RegistrationContainer from './Components/Authentication/Registration/RegistrationContainer';
import LoginContainer from './Components/Authentication/Login/LoginContainer';
import Social from './Social';
import NoMatch from './NoMatch';

function App() {
  return (
    <>
      <HashRouter>
        <Provider store={store}>
          <Switch>
            <Route path="/registration" component={RegistrationContainer} />
            <Route path="/login" component={LoginContainer} />
            
            <Route path="/" component={Social}/>
            <Route component={NoMatch}/>
          </Switch>
        </Provider>
      </HashRouter>
    </>
  );
}

export default App;