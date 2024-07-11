import styled from "styled-components";
import { COLOR } from "./consts";
import moment from "moment";

interface IProps {
  side: "left" | "right";
  sender: string;
  content: string;
  sentAt: Date;
  confirming: boolean;
}

const Message = ({ side, sender, content, sentAt, confirming }: IProps) => {
  return (
    <StyledWrapper side={side}>
      <StyledMessage>
        <StyledMessageTitle>
          {sender}{" "}
          <StyledDate>
            {" "}
            {moment(sentAt).calendar()} {confirming && <>(sending)</>}
          </StyledDate>
        </StyledMessageTitle>
        <StyledMessageContent>{content}</StyledMessageContent>
      </StyledMessage>
    </StyledWrapper>
  );
};

export { Message };

const StyledDate = styled.span`
  font-weight: 400;
  font-size: 0.875em;
  margin-left: 1em;
`;
const StyledWrapper = styled.div<{ side: "left" | "right" }>`
  display: flex;
  width: 100%;

  justify-content: ${(props) =>
    props.side === "left" ? "flex-start" : "flex-end"};
`;

const StyledMessage = styled.div`
  padding: 0.5em 1em;
  border-radius: 0.25em;
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
  display: flex;
  align-items: center;
`;

const StyledMessageContent = styled.p`
  font-size: 0.875em;
  margin: 0;
`;
