import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './index';

// const store = createStore(reducer);
const loggerMiddleware = createLogger();

const store = createStore(reducer, 
							applyMiddleware(
						    thunkMiddleware, // lets us dispatch() functions
						    loggerMiddleware // neat middleware that logs actions
						  ));
export default store;
