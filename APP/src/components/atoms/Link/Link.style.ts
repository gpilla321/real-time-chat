import styled from "styled-components";
import { COLOR } from "../../consts";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: ${COLOR.darkGray};
  width: 100%;
  margin-bottom: 1em;
`;

export { StyledLink };
