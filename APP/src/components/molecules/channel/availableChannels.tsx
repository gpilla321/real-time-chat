import styled from "styled-components";
import { useChannelContext } from "../../../contexts/channelContext";
import ChannelName from "./channelName";
import { Channel, User } from "../../../../graphql/schema";
import ContentWrapper from "./contentWrapper";

interface IProps {
  
}
const AvailableChannels = ({  }: IProps) => {
  const { channels, setSelectedChannel, getChannelName } = useChannelContext();

  const onClick = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  return (
    <ContentWrapper title="Channels">
      <StyledConversationListWrapper>
        {channels &&
          channels.map((channel, index) => (
            <ChannelName
              key={index}
              unviewedMessageCount={"10"}
              onClick={() => onClick(channel)}
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
  max-height: 35vh;
  overflow: auto;
`;
