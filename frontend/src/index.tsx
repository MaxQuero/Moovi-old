import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.parameters.scss';
import {ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink} from "@apollo/client";
import {createRoot} from "react-dom/client";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import { createClient } from 'graphql-ws';
import {getMainDefinition} from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri: 'http://www.moovi.fr:5000/graphql',
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://www.moovi.fr:5000/graphql',
    }),
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

const root = createRoot(document.getElementById('root')!)

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
