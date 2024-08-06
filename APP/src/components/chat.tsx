import styled from "styled-components";
import { COLOR } from "./consts";
import {
  useMessageSentSubscription,
  useMessagesQuery,
  UserMessageDto,
  useSendMessageMutation,
  useSetMessageViewedMutation,
} from "../../graphql/schema";
import { useEffect } from "react";
import { useUserContext } from "../contexts/userContext";
import { useChannelContext } from "../contexts/channelContext";
import { v4 } from "uuid";
import ChatHeader from "./molecules/chat/ChatHeader";
import ChatHistory from "./molecules/chat/ChatHistory";
import ChatTextEditor from "./molecules/chat/ChatTextEditor";
import useMessage from "../hooks/useMessage";

const Chat = () => {
  const [sendMessage] = useSendMessageMutation();
  const { currentUser } = useUserContext();
  const { selectedChannel, setSelectedChannel, getChannelName } =
    useChannelContext();
  const { messages } = useMessage(selectedChannel?.id);

  const handleSendMessage = (message: string) => {
    if (!message) return;

    const to = selectedChannel?.usersId.find((_) => _ !== currentUser?.userId);

    const input = {
      channelId: selectedChannel?.id!,
      content: message,
      from: currentUser!.userId,
      to: to!,
      clientUID: v4(),
    };

    sendMessage({
      variables: {
        input,
      },
    });
  };

  if (!selectedChannel)
    return <StyledWrapper empty>Start a Conversation</StyledWrapper>;

  return (
    <StyledWrapper>
      <ChatHeader
        title={getChannelName(selectedChannel.usersId)}
        onClose={() => setSelectedChannel(null)}
      />
      <ChatHistory
        messages={messages as UserMessageDto[]}
        currentUser={currentUser}
      />
      <ChatTextEditor handleSendMessage={handleSendMessage} />
    </StyledWrapper>
  );
};

export default Chat;

const StyledWrapper = styled.div<{ empty?: boolean }>`
  width: 80%;
  padding: 1em;
  background-color: ${COLOR.lightGray} !important;
  height: 100vh;
  box-sizing: border-box;

  ${(props) =>
    props.empty &&
    `display: flex; justify-content: center; align-items: center;`};
`;
