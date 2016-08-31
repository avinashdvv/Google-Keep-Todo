
import { combineReducers } from 'redux';
import todoReducers from "./todoReducers";
import labelReducers from './labelReducers';

export default  combineReducers({ 
								todoReducers,
								labelReducers,
								});
