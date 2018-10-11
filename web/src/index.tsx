import ApolloClient from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "./Routes";

const client = new ApolloClient({
  credentials: "include",
  uri: "http://localhost:4000/graphql"
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(255, 254, 252);
  }
  *:focus {
    outline: 0;
  }
  a {
    color: #0d0d0d;
    text-decoration: none;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Router />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
