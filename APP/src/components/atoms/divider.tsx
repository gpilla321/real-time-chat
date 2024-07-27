import styled from "styled-components";
import { COLOR } from "../consts";

const Divider = () => {
  return <StyledDivider />;
};

export default Divider;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  display: block;
  background-color: ${COLOR.white};
  margin: 1em 0;
`;
