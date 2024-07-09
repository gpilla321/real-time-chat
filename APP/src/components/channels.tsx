import styled from "styled-components";
import { COLOR } from "./consts";
import { StyledH3 } from "./common";

const Channels = () => {
  return (
    <StyledWrapper>
      <StyledH3 style={{ color: COLOR.white, marginBottom: "1em" }}>
        Conversations
      </StyledH3>
      <StyledConversationListWrapper>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
        <StyledConversation>Jhon Doe</StyledConversation>
      </StyledConversationListWrapper>
      <StyledAccount>
        <StyledAccountDetail>Logged as: Gustavo Pilla </StyledAccountDetail>
      </StyledAccount>
    </StyledWrapper>
  );
};

export default Channels;

const StyledWrapper = styled.div`
  width: 20%;
  background-color: ${COLOR.primary};
  padding: 2em;
  position: relative;
`;

const StyledConversationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  overflow: auto;
`;

const StyledConversation = styled.div`
  color: ${COLOR.white};
  font-size: 0.875em;
  padding: 0.5em 0.5em;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.white};
    color: ${COLOR.darkGray};
  }
`;

const StyledAccount = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  border-top: 1px solid ${COLOR.white};
`;

const StyledAccountDetail = styled.div`
  padding: 0 2em;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 0.875em;
  color: ${COLOR.white};
`;
