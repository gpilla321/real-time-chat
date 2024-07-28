import "./App.css";
import styled from "styled-components";
import Channels from "./components/pages/channels.tsx";
import Chat from "./components/chat.tsx";
import { ChannelProvider } from "./contexts/channelContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../graphql/apolloClient.ts";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import { UnviewedMessageProvider } from "./contexts/unviewedMessageContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <UnviewedMessageProvider>
              <StyledWrapper>
                <Channels />
                <Chat />
              </StyledWrapper>
            </UnviewedMessageProvider>
          </ChannelProvider>
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <ToastContainer
          position="top-right"
          autoClose={8000}
        />
        <RouterProvider router={routes} />
        <ToastContainer />
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
