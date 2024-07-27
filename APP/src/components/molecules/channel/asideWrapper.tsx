import styled from "styled-components";
import { StyledH3 } from "../../atoms/common";
import { COLOR } from "../../consts";

const AsideWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledWrapper>
      <StyledH3 style={{ color: COLOR.white, marginBottom: "1em" }}>
        Workspace
      </StyledH3>
      {children}
    </StyledWrapper>
  );
};

export default AsideWrapper;

const StyledWrapper = styled.div`
  width: 20%;
  background-color: ${COLOR.primary};
  padding: 1em;
  position: relative;
`;
