import styled from "styled-components";
import { COLOR } from "./consts";
import { StyledH1 } from "./common";
import Message from "./message";

const Chat = () => {
  return (
    <StyledWrapper>
      <StyledH1
        style={{
          paddingBottom: "0.5em",
        }}
      >
        Gustavo Pilla
      </StyledH1>
      <StyledWrapperChat>
        <Message side="left" />
        <Message side="right" />
        <Message side="left" />
        <Message side="right" />
        <Message side="right" />
        <Message side="right" />
      </StyledWrapperChat>
      <StyledWrapperTextEditor>test</StyledWrapperTextEditor>
    </StyledWrapper>
  );
};

export default Chat;

const StyledWrapper = styled.div`
  width: 80%;
  padding: 2em;
  background-color: ${COLOR.lightGray} !important;
`;

const StyledWrapperChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 55vh;
  overflow: auto;
  padding: 1em;
  background-color: ${COLOR.white};
  -webkit-box-shadow: inset 2px 2px 4px -2px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: inset 2px 2px 4px -2px rgba(0, 0, 0, 0.25);
  box-shadow: inset 2px 2px 4px -2px rgba(0, 0, 0, 0.25);
  border-radius: 0.5em;
  margin-bottom: 1em;
`;

const StyledWrapperTextEditor = styled.div`
  background-color: ${COLOR.white};
  padding: 1em;
  border: 1px solid ${COLOR.darkGray};
  border-radius: 0.5em;
`;
