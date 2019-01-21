/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import 'isomorphic-fetch';

const defaultState = {
  articles: [],
};

const cache = new InMemoryCache();

const stateLink = withClientState({
  defaults: defaultState,
  cache,
  resolvers: {
    count: 0,
  },
});

export default new ApolloClient({
  connectToDevTools: true,
  ssrMode: !process.browser,
  link: createHttpLink({
    uri: 'http://localhost:4000',
    credentials: 'include',
    headers: {
      origin: 'http://localhost:3000',
    },
  }),
  cache: process.browser ?
    new InMemoryCache().restore(window.__APOLLO_STATE__) :
    new InMemoryCache(),
});
