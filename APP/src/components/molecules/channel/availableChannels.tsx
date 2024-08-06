import styled from "styled-components";
import { useChannelContext } from "../../../contexts/channelContext";
import ChannelName from "./ChannelName";
import { Channel, useListChannelsQuery } from "../../../../graphql/schema";
import ContentWrapper from "./ContentWrapper";
import { useUserContext } from "../../../contexts/userContext";
import useUnviwedMessageContext from "../../../contexts/unviewedMessageContext";

interface IProps {}

const AvailableChannels = ({}: IProps) => {
  const { selectedChannel, setSelectedChannel, getChannelName } =
    useChannelContext();
  const { currentUser } = useUserContext();
  const { getUnviewedMessage } = useUnviwedMessageContext();

  const { data: channels } = useListChannelsQuery({
    skip: !currentUser,
    variables: {
      userId: currentUser?.userId!,
    },
  });

  const onClick = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  return (
    <ContentWrapper title="Channels">
      <StyledConversationListWrapper>
        {channels?.listChannels &&
          channels.listChannels.map((channel, index) => (
            <ChannelName
              key={index}
              unviewedMessageCount={getUnviewedMessage(channel.id)?.toString()}
              onClick={() => onClick(channel)}
              active={selectedChannel?.id === channel.id}
            >
              {getChannelName(channel.usersId)}
            </ChannelName>
          ))}
      </StyledConversationListWrapper>
    </ContentWrapper>
  );
};

export default AvailableChannels;

const StyledConversationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
