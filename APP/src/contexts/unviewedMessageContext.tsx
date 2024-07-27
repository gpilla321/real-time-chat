import { createContext, useContext } from "react";
import { useUnviewedMessagesQuery } from "../../graphql/schema";
import { useUserContext } from "./userContext";

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
  const { data: unviewedMessages, updateQuery } = useUnviewedMessagesQuery({
    skip: !currentUser,
    variables: {
      userId: currentUser?.userId!,
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
            count: 0,
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
