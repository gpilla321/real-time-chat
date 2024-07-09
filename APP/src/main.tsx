import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  ApolloProvider,
} from "@apollo/client";
import apolloClient from "../graphql/apolloClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
