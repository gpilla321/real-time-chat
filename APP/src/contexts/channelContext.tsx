import { createContext, ReactNode, useContext, useState } from "react";
import {
  Channel,
  useListUsersQuery,
  User,
  useUnviewedMessagesQuery,
  ViewByByChannelDto,
} from "../../graphql/schema";
import { useUserContext } from "./userContext";

export interface ChannelContextProps {
  selectedChannel: Channel | null;
  users: Partial<User>[] | undefined;
  setSelectedChannel: (channel: Channel | null) => void;
  getChannelName: (channelUsers: string[]) => string;
}

const ChannelContext = createContext<ChannelContextProps>({
  selectedChannel: null,
  users: [],
  setSelectedChannel: () => {},
  getChannelName: () => "",
});

const ChannelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const { currentUser } = useUserContext();
  const { data: users } = useListUsersQuery({
    skip: !currentUser,
    variables: {
      currentUserId: currentUser?.userId!,
    },
  });

  const getChannelName = (channelUsers: string[]) => {
    if (!users || !users.listUsers || !currentUser) return "N/A";
    const chatWithUserId = channelUsers.find(
      (user) => user !== currentUser?.userId
    );

    if (chatWithUserId)
      return (
        users.listUsers?.find((user) => user.id === chatWithUserId)?.name ||
        "N/A"
      );

    return "N/A";
  };

  return (
    <ChannelContext.Provider
      value={{
        users: users?.listUsers,
        selectedChannel,
        setSelectedChannel,
        getChannelName,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

const useChannelContext = () => useContext(ChannelContext);

export { ChannelProvider, useChannelContext };
