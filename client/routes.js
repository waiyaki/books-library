import React from 'react';
import { Router, Route, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';

import App from './App';
import Home from './components/Home';
import BooksListContainer from './components/Books/BooksList';
import AuthorListContainer from './components/Authors/AuthorsList';

import BooksQueries from './relay/queries/BooksQueries';
import AuthorQueries from './relay/queries/AuthorsQueries';

export default () => (
  <Router
    history={browserHistory}
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
  >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/books" component={BooksListContainer} queries={BooksQueries} />
      <Route path="/authors" component={AuthorListContainer} queries={AuthorQueries} />
    </Route>
  </Router>
);
