import styled from "styled-components";
import { COLOR } from "./consts";
import { StyledH1 } from "./common";
import Message from "./message";
import Button from "./button";

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
      <StyledWrapperTextEditor>
        <StyledAutocomplete placeholder="Type the message" />
        <StyledButtonArea>
          <Button text="Send" />
        </StyledButtonArea>
      </StyledWrapperTextEditor>
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
  height: 65vh;
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
  display: flex;
  justify-content: space-between;
`;

const StyledAutocomplete = styled.textarea`
  border: 0;
  outline: 0;
  width: 100%;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
  background-color: ${COLOR.white};
  border-radius: 0.5em;
  -webkit-box-shadow: inset 2px 2px 4px -2px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: inset 2px 2px 4px -2px rgba(0, 0, 0, 0.25);
  box-shadow: inset 2px 2px 4px -2px rgba(0, 0, 0, 0.25);
  min-height: 10vh;
  font-family: "Montserrat", sans-serif;
  width: 90%;
`;

const StyledButtonArea = styled.div`
  width: 10%;
  background-color: ${COLOR.lightGray};
  display: flex;
  align-items: center;
  justify-content: end;
`;
