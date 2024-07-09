import "./App.css";
import { useMessagesQuery } from "../graphql/schema.tsx";
import styled from "styled-components";
import Channels from "./components/channels.tsx";
import Chat from "./components/chat.tsx";

function App() {
  const { data, loading, error } = useMessagesQuery({
    variables: {
      channelId: "668c71f0ac3d4b03c42cbc40",
    },
  });

  console.log(data);

  return (
    <StyledWrapper>
      <Channels />
      <Chat />
    </StyledWrapper>
  );
}

export default App;

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
