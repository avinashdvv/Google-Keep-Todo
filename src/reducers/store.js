import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './index';
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from 'react-router-redux';
const loggerMiddleware = createLogger();

const store = createStore(reducer, 
							applyMiddleware(
						    thunkMiddleware, // lets us dispatch() functions
						    loggerMiddleware // neat middleware that logs actions
						  ));
export const history = syncHistoryWithStore(browserHistory, store)
export default store;
