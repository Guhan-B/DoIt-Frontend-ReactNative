import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appReducer from './app/reducer';
import userReducer from './user/reducer';
import authenticationReducer from './authentication/reducer';
import verificationReducer from './verification/reducer';
import logReducer from './logs/reducer';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    auth: authenticationReducer,
    verify: verificationReducer,
    log: logReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;