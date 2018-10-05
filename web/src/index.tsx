import ApolloClient from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "./Routes";

const client = new ApolloClient({
  credentials: "include",
  uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
