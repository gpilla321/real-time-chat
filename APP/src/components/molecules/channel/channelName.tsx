import styled from "styled-components";
import { COLOR } from "../../consts";
import Badge from "../../atoms/badge";

interface IProps {
  children: string;
  key: string | number;
  unviewedMessageCount: string;
  onClick: () => void;
}

const ChannelName = ({
  children,
  key,
  unviewedMessageCount,
  onClick,
}: IProps) => {
  return (
    <StyledConversation key={key} onClick={onClick}>
      {children}
      <Badge text={unviewedMessageCount} />
    </StyledConversation>
  );
};

export default ChannelName;

const StyledConversation = styled.div`
  color: ${COLOR.white};
  font-size: 0.875em;
  padding: 0.5em 0.5em;
  cursor: pointer;
  border-radius: 0.25em;
  display: flex;

  &:hover {
    background-color: ${COLOR.white};
    color: ${COLOR.darkGray};
  }
`;
