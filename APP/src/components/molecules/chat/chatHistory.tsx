import styled from "styled-components";
import { COLOR } from "../../consts";
import { User, UserMessageDto } from "../../../../graphql/schema";
import { ChatMessage } from "./ChatMessage";
import { LoggedUser } from "../../../contexts/userContext";

interface IProps {
  messages: UserMessageDto[] | undefined;
  currentUser: LoggedUser | null;
}

const ChatHistory = ({ messages, currentUser }: IProps) => {
  return (
    <StyledWrapperChat id="chat-wrapper">
      {messages?.map((_) => (
        <ChatMessage
          key={_.timestamp}
          side={_.from.id === currentUser?.userId ? "right" : "left"}
          content={_.content}
          sender={_.from.name}
          sentAt={_.timestamp}
          confirming={_.id === "sending"}
        />
      ))}
    </StyledWrapperChat>
  );
};

export default ChatHistory;

const StyledWrapperChat = styled.div`
  transition: 0.2s;
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
