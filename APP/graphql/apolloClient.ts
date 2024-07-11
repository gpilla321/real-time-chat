import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";

// HTTP connection to the GraphQL API
const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  // Additional options can be added here
});

// Create a WebSocket link:
const wsClient = new SubscriptionClient("ws://localhost:5000/graphql", {
  reconnect: true, // Automatic reconnection
});

const wsLink = new WebSocketLink(wsClient);

// Using split to direct query and mutation operations to the HTTP link
// and subscription operations to the WebSocket link
const link = split(
  // Split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;