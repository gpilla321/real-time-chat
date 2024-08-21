import { StyledLink } from "./Link.style";

interface Props {
  to: string;
  children: string;
}

const DefaultLink = ({ to, children }: Props) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default DefaultLink;
