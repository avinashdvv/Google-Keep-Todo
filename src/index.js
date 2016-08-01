import './style/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Store from './reducers/store';

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
