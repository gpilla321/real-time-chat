import styled from "styled-components";
import { COLOR } from "../consts";

interface IProps {
  text: string;
}

const Badge = ({ text }: IProps) => <StyledBadge>{text}</StyledBadge>;

export default Badge;

const StyledBadge = styled.div`
  background-color: ${COLOR.secondary};
  color: ${COLOR.white};
`;
