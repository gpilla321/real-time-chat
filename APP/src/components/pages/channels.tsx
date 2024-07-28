import AsideWrapper from "../molecules/channel/asideWrapper";
import AccountInfo from "../molecules/channel/accountInfo";
import AvailableUsers from "../molecules/channel/availableUsers";
import AvailableChannels from "../molecules/channel/availableChannels";
import { useChannelContext } from "../../contexts/channelContext";
import Divider from "../atoms/divider";
import styled from "styled-components";

interface IProps {}

const Channels = ({}: IProps) => {
  const { users } = useChannelContext();

  return (
    <AsideWrapper>
      <StyledContent>
        <AvailableChannels />
        <Divider />
        <AvailableUsers users={users} />
        <AccountInfo />
      </StyledContent>
    </AsideWrapper>
  );
};

export default Channels;

const StyledContent = styled.div`
  height: 80vh;
  overflow: auto;
  padding-right: 1em;
`