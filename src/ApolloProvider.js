import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = new HttpLink({
  uri: "https://secure-bayou-07628.herokuapp.com/",
});
const authLink= setContext(()=>{
  const token= localStorage.getItem('jwtToken')
  return {
    headers:{
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
