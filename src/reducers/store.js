import { createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';
import reducer from './index';

// const middleware = applyMiddlewere(thunk, logger);
const store = createStore(reducer);
export default store;
