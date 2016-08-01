import { combineReducers } from 'redux';
import dataReducers from "./dataReducers";
import networkReducers from './networkReducers'

export default  combineReducers({dataReducers,networkReducers});
