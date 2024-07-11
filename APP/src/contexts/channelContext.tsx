import { createContext, ReactNode, useContext, useState } from "react";
import {
  Channel,
  useListChannelsQuery,
  User,
  useUnviewedMessagesQuery,
  ViewByByChannelDto,
} from "../../graphql/schema";

// Removed children from the context props interface
export interface ChannelContextProps {
  channels: Channel[];
  unviwedMessages: ViewByByChannelDto[];
  selectedChannel: Channel | null;
  setSelectedChannel: (channel: Channel | null) => void;
}

const ChannelContext = createContext<ChannelContextProps>({
  channels: [],
  unviwedMessages: [],
  selectedChannel: null,
  setSelectedChannel: () => {},
});

const ChannelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [currentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "{}") ?? null
  );
  const { data: channels } = useListChannelsQuery({
    skip: !currentUser,
    variables: {
      userId: currentUser?.id!,
    },
  });

  const { data: unviewedMessages } = useUnviewedMessagesQuery({
    skip: !currentUser,
    variables: {
      userId: currentUser?.id!,
    },
  });

  return (
    <ChannelContext.Provider
      value={{
        channels: channels?.listChannels || [],
        unviwedMessages: unviewedMessages?.channelViewedBy || [],
        selectedChannel,
        setSelectedChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

const useChannelContext = () => useContext(ChannelContext);

export { ChannelProvider, useChannelContext };
