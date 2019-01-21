/* eslint-disable import/no-dynamic-require */
import React from 'react';
import express from 'express';
import { ServerLocation } from '@reach/router';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import cors from 'cors';
import App from './App/App';
import SharedClient from './apollo';

import 'isomorphic-fetch';

const server = express();
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const HTMLTemplate = (markup, initialApolloState) => {
  return `
    <!doctype html>
    <html lang="">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Supportr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css ?
          `<link rel="stylesheet" href="${assets.client.css}">` : ''
        }
        ${
          process.env.NODE_ENV === 'production' ?
          `<script src="${assets.client.js}" defer></script>` :
          `<script src="${assets.client.js}" defer crossorigin></script>`
        }
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>
          window.__APOLLO_STATE__ = ${
            JSON.stringify(initialApolloState).replace(/</g, '\\u003c')
          }
        </script>
      </body>
    </html>
  `;
};

server
  .disable('x-powered-by')
  .use(cors())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const Root = () => (
      <ApolloProvider client={ SharedClient }>
        <ServerLocation url={req.url}>
          <App path='/' />
        </ServerLocation>
      </ApolloProvider>
    );

    try {
      await getDataFromTree(<Root />);
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }

    const initialApolloState = SharedClient.extract();

    const markup = renderToString(<Root />);

    res.status(200).send(HTMLTemplate(markup, initialApolloState));
  });

export default server;
