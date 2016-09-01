import './style/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar';
import App from './components/App';
import Store,{ history } from './reducers/store';
import {Router, Route, IndexRoute, browserHistory } from "react-router";

render(
	<Provider store={Store}>
		<Router history={ history }>
	 		<Route path='/' component={App}></Route>
		</Router>
	</Provider>,
  document.getElementById('app')
);
