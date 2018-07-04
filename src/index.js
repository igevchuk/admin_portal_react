import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import routes from '@routes/dashboard';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './layouts/App.jsx';

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Route path="/" component={ App } />
    </Router>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();

