import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import authReducer from './auth-reducer';
import userReducer from './user-reducer';
import notificationReducer from './notification-reducer';
import dialogReducer from "./dialog-reducer";
import postsReducer from './posts-reducer';
import eventsReducer from "./events-reducer";

let reducers = combineReducers({
    authReducer,
    userReducer,
    postsReducer,
    dialogReducer,
    notificationReducer,
    eventsReducer,
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
