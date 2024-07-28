import { createContext, useContext } from "react";
import {
  NewMessageSubscription,
  useNewMessageSubscription,
  useUnviewedMessagesQuery,
} from "../../graphql/schema";
import { useUserContext } from "./userContext";
import { OnDataOptions } from "@apollo/client";
import { useChannelContext } from "./channelContext";
import { Bounce, toast } from "react-toastify";
import Toastify from "../common/Toastify";

interface UnviwedMessages {
  channelId: string;
  count: number;
}

export interface IProps {
  unviewedMessages: UnviwedMessages[];
  getUnviewedMessage: (channel: string) => number | undefined;
  resetUnviewedMessage: (channelId: string) => void;
}

const UnviewedMessageContext = createContext<IProps>({
  unviewedMessages: [],
  getUnviewedMessage: () => undefined,
  resetUnviewedMessage: () => {},
});

export const UnviewedMessageProvider = ({ children }: any) => {
  const { currentUser } = useUserContext();
  const { selectedChannel } = useChannelContext();
  const { data: unviewedMessages, updateQuery } = useUnviewedMessagesQuery({
    skip: !currentUser,
    variables: {
      userId: currentUser?.userId!,
    },
  });

  useNewMessageSubscription({
    variables: {
      userId: currentUser?.userId!,
    },
    onData: (result: OnDataOptions<NewMessageSubscription>) => {
      if (!result || !result.data || !result.data.data?.newMessage) return;

      const { from, message, channelId } = result.data.data.newMessage;

      if (selectedChannel?.id !== channelId || !selectedChannel) {
        Toastify().showMessage(from, message);
      }
      updateUnviewedMessageCount(
        channelId,
        (getUnviewedMessage(channelId) ?? 0) + 1
      );
    },
  });

  const getUnviewedMessage = (channel: string) => {
    const unviwedMessagesCount = unviewedMessages?.channelViewedBy.find(
      (viewedBy) => viewedBy.channelId === channel
    );

    return unviwedMessagesCount && unviwedMessagesCount.count > 0
      ? unviwedMessagesCount.count
      : undefined;
  };

  const resetUnviewedMessage = (channelId: string) => {
    updateUnviewedMessageCount(channelId, 0);
  };

  const updateUnviewedMessageCount = (channelId: string, count: number = 0) => {
    updateQuery((prev) => {
      const data = prev.channelViewedBy.filter(
        (_) => _.channelId !== channelId
      );

      return Object.assign({}, prev, {
        ...prev,
        channelViewedBy: [
          ...data,
          {
            channelId,
            count,
          },
        ],
      });
    });
  };

  return (
    <UnviewedMessageContext.Provider
      value={{
        unviewedMessages: unviewedMessages?.channelViewedBy || [],
        getUnviewedMessage,
        resetUnviewedMessage,
      }}
    >
      {children}
    </UnviewedMessageContext.Provider>
  );
};

const useUnviwedMessageContext = () => useContext(UnviewedMessageContext);

export default useUnviwedMessageContext;
