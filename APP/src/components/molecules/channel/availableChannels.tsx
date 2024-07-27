import styled from "styled-components";
import { useChannelContext } from "../../../contexts/channelContext";
import { useUserContext } from "../../../contexts/userContext";
import ChannelName from "./channelName";
import { Channel } from "../../../../graphql/schema";

const AvailableChannels = () => {
  const { channels, setSelectedChannel } = useChannelContext();
  const { currentUser } = useUserContext();

  const onClick = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  return (
    <StyledConversationListWrapper>
      {channels &&
        channels.map((c, index) => (
          <ChannelName
            key={index}
            unviewedMessageCount={"10"}
            onClick={() => onClick(c)}
          >
            test
          </ChannelName>
        ))}
    </StyledConversationListWrapper>
  );
};

export default AvailableChannels;

const StyledConversationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 35vh;
  overflow: auto;
`;
