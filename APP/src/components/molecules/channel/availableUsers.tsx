import styled from "styled-components";
import { COLOR } from "../../consts";
import { useCreateChannelMutation, User } from "../../../../graphql/schema";
import { useUserContext } from "../../../contexts/userContext";
import ContentWrapper from "./contentWrapper";

interface IProps {
  users: Partial<User>[] | undefined;
}

const AvailableUsers = ({ users }: IProps) => {
  const { currentUser } = useUserContext();
  const [createChannel] = useCreateChannelMutation();

  // console.log(data);

  const onClick = (toUserId: string) => {
    createChannel({
      variables: {
        input: {
          from: currentUser?.userId!,
          to: toUserId,
        },
      },
    });
  };

  if (!users) return null;

  return (
    <ContentWrapper title="Users">
      <StyledConversationListWrapper>
        {users?.map((_, index) => (
          <StyledConversation key={index} onClick={() => onClick(_.id!)}>
            {_.name}
          </StyledConversation>
        ))}
      </StyledConversationListWrapper>
    </ContentWrapper>
  );
};

export default AvailableUsers;

const StyledConversationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 35vh;
  overflow: auto;
`;

const StyledConversation = styled.div`
  color: ${COLOR.white};
  font-size: 0.875em;
  padding: 0.5em 0.5em;
  cursor: pointer;
  border-radius: 0.25em;

  &:hover {
    background-color: ${COLOR.white};
    color: ${COLOR.darkGray};
  }
`;
