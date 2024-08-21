import styled from "styled-components";
import { COLOR } from "../../consts";
import Badge from "../../atoms/Badge/Badge";

interface IProps {
  children: string;
  key: string | number;
  unviewedMessageCount: string | undefined;
  active: boolean;
  onClick: () => void;
}

const ChannelName = ({
  children,
  key,
  unviewedMessageCount,
  active,
  onClick,
}: IProps) => {
  return (
    <StyledConversation key={key} onClick={onClick} active={active}>
      {children}
      {unviewedMessageCount && <Badge text={unviewedMessageCount} />}
    </StyledConversation>
  );
};

export default ChannelName;

const StyledConversation = styled.div<{ active: boolean }>`
  color: ${COLOR.white};
  font-size: 0.875em;
  padding: 0.35em 0.35em;
  cursor: pointer;
  border-radius: 0.25em;
  display: flex;
  margin-bottom: 0.25em;

  &:hover {
    background-color: ${COLOR.white};
    color: ${COLOR.darkGray};
  }

  ${(props) =>
    props.active &&
    `
    background-color: ${COLOR.white};
    color: ${COLOR.darkGray};
  `}
`;
