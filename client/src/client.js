import { Router } from '@reach/router';
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import SharedClient from './apollo';
import App from './App/App';

hydrate(
  <ApolloProvider client={SharedClient}>
    <Router>
      <App path='/' />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
