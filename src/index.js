import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { useHistory } from 'react-router-dom'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';


const client = new ApolloClient({
  headers: {
      'Authorization': 'Token 79d6ff2932521455b5e441d2a3c0037bfd5350d5',
  },
  uri: 'https://production.suggestic.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,document.getElementById('root')
);
