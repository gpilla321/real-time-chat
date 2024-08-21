import AsideWrapper from "../molecules/channel/AsideWrapper";
import AccountInfo from "../molecules/channel/AccountInfo/AccountInfo";
import AvailableUsers from "../molecules/channel/AvailableUsers";
import AvailableChannels from "../molecules/channel/AvailableChannels";
import { useChannelContext } from "../../contexts/channelContext";
import Divider from "../atoms/Divider/Divider";
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