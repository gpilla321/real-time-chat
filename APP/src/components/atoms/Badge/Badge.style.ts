import styled from "styled-components";
import { COLOR } from "../../consts";

const StyledBadge = styled.div`
  background-color: ${COLOR.secondary};
  color: ${COLOR.white};
  border-radius: 100%;
  padding: 0.25em 0.75em;
  font-size: 0.65em;
  margin-left: 0.5em;
  font-weight: 600;
`;

export { StyledBadge };
