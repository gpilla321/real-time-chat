import { createContext, ReactNode, useContext, useState } from "react";
import { Channel, useListChannelsQuery, User } from "../../graphql/schema";

// Removed children from the context props interface
export interface ChannelContextProps {
  channels: Channel[];
  selectedChannel: Channel | null;
  setSelectedChannel: (channel: Channel | null) => void;
}

const ChannelContext = createContext<ChannelContextProps>({
  channels: [],
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

  return (
    <ChannelContext.Provider
      value={{
        channels: channels?.listChannels || [],
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
