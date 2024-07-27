import AsideWrapper from "./molecules/channel/asideWrapper";
import AccountInfo from "./molecules/channel/accountInfo";
import ContentWrapper from "./molecules/channel/contentWrapper";
import AvailableUsers from "./molecules/channel/availableUsers";
import AvailableChannels from "./molecules/channel/availableChannels";

interface IProps {}

const Channels = ({}: IProps) => {
  return (
    <AsideWrapper>
      <ContentWrapper title="Channels">
        <AvailableChannels />
      </ContentWrapper>
      <ContentWrapper title="Users">
        <AvailableUsers />
      </ContentWrapper>
      <AccountInfo />
    </AsideWrapper>
  );
};

export default Channels;
