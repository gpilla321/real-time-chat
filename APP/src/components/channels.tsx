import styled from "styled-components";
import { COLOR } from "./consts";
import { StyledH3 } from "./common";
import { useChannelContext } from "../contexts/channelContext";
import { useUserContext } from "../contexts/userContext";
import DefaultLink from "./link";
import Button from "./button";

interface IProps {}

const Channels = ({}: IProps) => {
  const { channels, setSelectedChannel, unviwedMessages } = useChannelContext();
  const { currentUser, users } = useUserContext();

  console.log(unviwedMessages);

  return (
    <StyledWrapper>
      <StyledH3 style={{ color: COLOR.white, marginBottom: "1em" }}>
        Conversations
      </StyledH3>
      <StyledConversationListWrapper>
        {channels &&
          channels.map((c, index) => (
            <StyledConversation
              key={index}
              onClick={() => {
                setSelectedChannel(c);
              }}
            >
              {c.usersId.map(
                (_) =>
                  currentUser?.id !== _ && (
                    <div key={_}>
                      {users.find((__) => __.id === _)?.name} (
                      {
                        unviwedMessages?.find((um) => um.channelId === c.id)
                          ?.count
                      }
                      )
                    </div>
                  )
              )}
            </StyledConversation>
          ))}
      </StyledConversationListWrapper>
      <StyledH3 style={{ color: COLOR.white, margin: "1em 0" }}>Users</StyledH3>
      <StyledConversationListWrapper>
        {users &&
          users.map((_, index) => (
            <StyledConversation key={index}>{_.name}</StyledConversation>
          ))}
      </StyledConversationListWrapper>
      <StyledAccount>
        <StyledAccountDetail>
          Logged as: {currentUser?.name || "No user selected"}
          <Button text="Logout" color="white" />
        </StyledAccountDetail>
      </StyledAccount>
    </StyledWrapper>
  );
};

export default Channels;

const StyledWrapper = styled.div`
  width: 20%;
  background-color: ${COLOR.primary};
  padding: 1em;
  position: relative;
`;

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

const StyledAccount = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${COLOR.white};
`;

const StyledAccountDetail = styled.div`
  padding: 0 2em;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 0.875em;
  color: ${COLOR.white};
`;
