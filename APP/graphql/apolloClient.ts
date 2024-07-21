import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
  },
});

const wsClient = new SubscriptionClient("ws://localhost:5000/graphql", {
  reconnect: true,
});

const wsLink = new WebSocketLink(wsClient);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
