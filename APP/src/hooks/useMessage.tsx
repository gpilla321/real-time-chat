import { useEffect } from "react";
import {
  Message,
  useMessageSentSubscription,
  useMessagesQuery,
  useSetMessageViewedMutation,
} from "../../graphql/schema";
import useUnviwedMessageContext from "../contexts/unviewedMessageContext";
import { useUserContext } from "../contexts/userContext";

const useMessage = (channelId: string | undefined) => {
  const { currentUser } = useUserContext();
  const [setMessageViewed] = useSetMessageViewedMutation();
  const { resetUnviewedMessage } = useUnviwedMessageContext();

  const { data, updateQuery } = useMessagesQuery({
    skip: !currentUser || !channelId,
    variables: {
      channelId: channelId!,
    },
  });

  useMessageSentSubscription({
    skip: !currentUser || !channelId,
    variables: {
      channelId: channelId!,
    },
    onData: (result) => {
      if (!result || !result.data) return;

      updateQuery((prev) => {
        if (!prev) return prev;

        return Object.assign({}, prev, {
          ...prev,
          messages: [
            ...prev.messages,
            result.data.data?.messageSent as Message,
          ],
        });
      });
    },
    shouldResubscribe: true,
  });

  const onMessageViewed = (messageIds: string[]) => {
    setMessageViewed({
      variables: {
        userId: currentUser?.userId!,
        messageIds,
      },
    });
  };

  useEffect(() => {
    if (!channelId) return;
    var chat = document.getElementById("chat-wrapper");

    if (data) {
      const unviewedMessages = data.messages.filter(
        (_) => !_.viewedBy.includes(currentUser?.userId!)
      );

      if (unviewedMessages && unviewedMessages.length > 0) {
        onMessageViewed(unviewedMessages.map((_) => _.id));
        resetUnviewedMessage(channelId);
      }
    }

    if (chat) chat.scrollTo(0, chat.scrollHeight);
  }, [data]);

  return { messages: data?.messages || [] };
};

export default useMessage;
