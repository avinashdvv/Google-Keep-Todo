
import { combineReducers } from 'redux';
import todoReducers from "./todoReducers";
import labelReducers from './labelReducers';
import { routerReducer } from 'react-router-redux';

export default  combineReducers({ 
								todoReducers,
								labelReducers,
								routing : routerReducer
								});
