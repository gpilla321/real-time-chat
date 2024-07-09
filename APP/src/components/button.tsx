import styled from "styled-components";
import { COLOR } from "./consts";

interface IProps {
  text: string;
}

const Button = ({ text }: IProps) => {
  return <StyledButton>{text}</StyledButton>;
};

export default Button;

const StyledButton = styled.div`
  border: 1px solod ${COLOR.darkGray};
  background-color: ${COLOR.primary};
  padding: 2em;
  border-radius: 0.5em;
  color: ${COLOR.white};
  cursor: pointer;
`;
