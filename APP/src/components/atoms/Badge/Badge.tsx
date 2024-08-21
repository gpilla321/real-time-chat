import { StyledBadge } from "./Badge.style";

interface IProps {
  text: string;
}

const Badge = ({ text }: IProps) => <StyledBadge>{text}</StyledBadge>;

export default Badge;

