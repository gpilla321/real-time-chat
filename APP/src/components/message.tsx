import styled from "styled-components";
import { COLOR } from "./consts";

interface IProps {
  side: "left" | "right";
}

const Message = ({ side }: IProps) => {
  return (
    <StyledWrapper side={side}>
      <StyledMessage>
        <StyledMessageTitle>Gustavo Pilla</StyledMessageTitle>
        <StyledMessageContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </StyledMessageContent>
      </StyledMessage>
    </StyledWrapper>
  );
};

export default Message;

const StyledWrapper = styled.div<{ side: "left" | "right" }>`
  display: flex;
  width: 100%;

  justify-content: ${(props) =>
    props.side === "left" ? "flex-start" : "flex-end"};
`;

const StyledMessage = styled.div`
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: 1px solid ${COLOR.lightGray2};
  background-color: ${COLOR.lightGray};
  max-width: 45%;
  margin-bottom: 0.5em;
  -webkit-box-shadow: 1px 1px 4px -2px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 1px 4px -2px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 1px 4px -2px rgba(0, 0, 0, 0.25);
`;

const StyledMessageTitle = styled.span`
  font-size: 0.875em;
  font-weight: 600;
`;

const StyledMessageContent = styled.p`
  font-size: 0.875em;
  margin: 0;
`;
