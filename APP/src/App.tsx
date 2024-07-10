import "./App.css";
import styled from "styled-components";
import Channels from "./components/channels.tsx";
import Chat from "./components/chat.tsx";
import { ChannelProvider } from "./contexts/channelContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";

function App() {
  return (
    <ChannelProvider>
      <UserProvider>
        <StyledWrapper>
          <Channels />
          <Chat />
        </StyledWrapper>
      </UserProvider>
    </ChannelProvider>
  );
}

export default App;

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
