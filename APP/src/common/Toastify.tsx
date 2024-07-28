import { toast } from "react-toastify";
import styled from "styled-components";

const Toastify = () => {
  const showMessage = (title: string, message: string) => {
    toast.success(<MessageToast title={title} message={message} />);
  };

  return { showMessage };
};

export default Toastify;

const MessageToast = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <StyledWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>{message}</StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;
const StyledTitle = styled.h6`
  font-size: 1em;
  margin: 0 0 0.5em;
  font-weight: 600;
`;
const StyledContent = styled.p`
  margin: 0;
  font-size: 0.875em;
`;
