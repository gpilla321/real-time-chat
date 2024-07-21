import styled from "styled-components";
import { COLOR } from "./consts";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: string;
}

const DefaultLink = ({ to, children }: Props) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default DefaultLink;

const StyledLink = styled(Link)`
  color: ${COLOR.darkGray};
  width: 100%;
  margin-bottom: 1em;
`;
