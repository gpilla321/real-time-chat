import styled from "styled-components";
import { COLOR } from "../../consts";
import Button from "../../atoms/button";
import { useState } from "react";

interface IProps {
  handleSendMessage: (message: string) => void;
}

const ChartTextEditor = ({ handleSendMessage }: IProps) => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (newValue: string) => {
    setText(newValue);
  };

  const onClick = (message: string) => {
    handleSendMessage(message);
    setText("");
  };

  return (
    <StyledWrapperTextEditor>
      <StyledAutocomplete
        value={text}
        placeholder="Type the message"
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <StyledButtonArea>
        <Button text="Send" onClick={() => onClick(text)} />
      </StyledButtonArea>
    </StyledWrapperTextEditor>
  );
};

export default ChartTextEditor;

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
