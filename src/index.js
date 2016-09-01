import './style/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Login from './components/Login';
import Store,{ history } from './reducers/store';
import {Router, Route, IndexRoute, browserHistory } from "react-router";

render(
	<Provider store={Store}>
		<Router history={ history }>
	 		<Route path='/' component={Login}></Route>
	 		<Route path='/dashboard' component={App}></Route>

		</Router>
	</Provider>,
  document.getElementById('app')
);
