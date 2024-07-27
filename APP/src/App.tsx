import "./App.css";
import styled from "styled-components";
import Channels from "./components/channels.tsx";
import Chat from "./components/chat.tsx";
import { ChannelProvider } from "./contexts/channelContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../graphql/apolloClient.ts";
import ProtectedRoute from "./common/ProtectedRoute.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/create-account",
      element: <CreateAccount />,
    },
    {
      path: "/workspace",
      element: (
        <ProtectedRoute>
          <ChannelProvider>
            <StyledWrapper>
              <Channels />
              <Chat />
            </StyledWrapper>
          </ChannelProvider>
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <RouterProvider router={routes} />
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
