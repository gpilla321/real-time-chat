import styled from "styled-components";
import { StyledH1 } from "../../atoms/Common";

interface IProps {
  title: string;
  onClose: () => void;
}

const ChatHeader = ({ title, onClose }: IProps) => {
  return (
    <StyledHeader>
      <StyledH1>
        {title}
        {/* {getChannelName(selectedChannel.usersId)} */}
      </StyledH1>
      <StyledActionArea onClick={onClose}>X</StyledActionArea>
    </StyledHeader>
  );
};

export default ChatHeader;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;
const StyledActionArea = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  cursor: pointer;
`;
