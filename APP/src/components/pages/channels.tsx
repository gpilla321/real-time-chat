import AsideWrapper from "../molecules/channel/asideWrapper";
import AccountInfo from "../molecules/channel/accountInfo";
import AvailableUsers from "../molecules/channel/availableUsers";
import AvailableChannels from "../molecules/channel/availableChannels";
import { useListUsersQuery } from "../../../graphql/schema";

interface IProps {}

const Channels = ({}: IProps) => {
  const { data: users } = useListUsersQuery();

  return (
    <AsideWrapper>
      <AvailableChannels />
      <AvailableUsers users={users?.listUsers} />
      <AccountInfo />
    </AsideWrapper>
  );
};

export default Channels;
