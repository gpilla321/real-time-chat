import "./App.css";
import styled from "styled-components";
import Channels from "./components/channels.tsx";
import Chat from "./components/chat.tsx";
import { ChannelProvider } from "./contexts/channelContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/workspace"
            element={
              <ChannelProvider>
                <StyledWrapper>
                  <Channels />
                  <Chat />
                </StyledWrapper>
              </ChannelProvider>
            }
          />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
