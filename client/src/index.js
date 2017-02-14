import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Relay from 'react-relay';

import App from './App';
import Home from './Home';
import BooksList from './BooksList';

import BooksQueries from './relay/queries/BooksQueries';

import './index.css';

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/books" component={BooksList} queries={BooksQueries} />
    </Route>
  </Router>,
  document.getElementById('root')
);
