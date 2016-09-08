import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './index';
import { hashHistory } from "react-router";
import { syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
const loggerMiddleware = createLogger();

const store = createStore(reducer, 
							applyMiddleware(
						    thunkMiddleware, // lets us dispatch() functions
						    loggerMiddleware,  // neat middleware that logs actions
						    promiseMiddleware
						  ));
export const history = syncHistoryWithStore(hashHistory, store)
export default store;
