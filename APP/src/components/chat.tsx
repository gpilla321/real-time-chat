import styled from "styled-components";
import { COLOR } from "./consts";
import { StyledH1 } from "./common";
import Message from "./message";
import Button from "./button";
import { useMessagesQuery, useSendMessageMutation } from "../../graphql/schema";
import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useChannelContext } from "../contexts/channelContext";

const Chat = () => {
  const { currentUser, users } = useUserContext();
  const { selectedChannel, setSelectedChannel } = useChannelContext();
  const [text, setText] = useState("");
  const [sendMessage] = useSendMessageMutation();

  const { data, refetch } = useMessagesQuery({
    skip: !currentUser && !selectedChannel,
    variables: {
      channelId: selectedChannel?.id || "",
    },
  });

  const handleTextChange = (newValue: string) => {
    setText(newValue);
  };

  const handleSendMessage = () => {
    if (!text) return;
    const otherUser = selectedChannel?.usersId.find(
      (_) => _ !== currentUser?.id
    );
    sendMessage({
      variables: {
        input: {
          channelId: selectedChannel?.id!,
          content: text,
          to: otherUser!,
          from: currentUser!.id,
        },
      },
    });
    setText("");
    setTimeout(() => {
      refetch();
    }, 500);
  };
  const getChannelName = () => {
    if (currentUser && selectedChannel) {
      const user = selectedChannel.usersId.find((_) => _ !== currentUser.id);

      return user ? users.find((_) => _.id === user)?.name : "";
    }
  };

  if (!selectedChannel)
    return <StyledWrapper empty>Start a Conversation</StyledWrapper>;

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledH1
          style={{
            paddingBottom: "0.5em",
          }}
        >
          {getChannelName()}
        </StyledH1>
        <StyledActionArea onClick={() => setSelectedChannel(null)}>
          X
        </StyledActionArea>
      </StyledHeader>
      <StyledWrapperChat>
        {data &&
          data.messages?.map((_) => (
            <Message
              key={_.id}
              side={_.from.id === currentUser?.id ? "right" : "left"}
              content={_.content}
              sender={_.from.name}
              sentAt={_.timestamp}
            />
          ))}
      </StyledWrapperChat>
      <StyledWrapperTextEditor>
        <StyledAutocomplete
          value={text}
          placeholder="Type the message"
          onChange={(e) => handleTextChange(e.target.value)}
        />
        <StyledButtonArea>
          <Button text="Send" onClick={handleSendMessage} />
        </StyledButtonArea>
      </StyledWrapperTextEditor>
    </StyledWrapper>
  );
};

export default Chat;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledActionArea = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  cursor: pointer;
`;

const StyledWrapper = styled.div<{ empty?: boolean }>`
  width: 80%;
  padding: 1em;
  background-color: ${COLOR.lightGray} !important;
  height: 100vh;

  ${(props) =>
    props.empty &&
    `display: flex; justify-content: center; align-items: center;`};
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
