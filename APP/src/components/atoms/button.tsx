import styled from "styled-components";
import { COLOR } from "../consts";

interface IProps {
  text: string;
  onClick?: () => void;
  register?: any;
  isSubmit?: boolean;
  fullWidth?: boolean;
  color?: "primary" | "white";
  margin?: string;
}

const Button = ({
  text,
  register,
  isSubmit,
  fullWidth,
  color,
  margin,
  onClick,
}: IProps) => {
  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <StyledButton
      onClick={handleOnClick}
      type={isSubmit ? "submit" : ""}
      fullWidth={fullWidth}
      color={color}
      margin={margin}
      {...register}
    >
      {text}
    </StyledButton>
  );
};

export default Button;

const primaryButton = `
  color: ${COLOR.white};
  background-color: ${COLOR.primary};
`;

const whiteButton = `
  color: ${COLOR.darkGray};
  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.lightGray3};
`;

const ButtonStyles = {
  ["primary"]: primaryButton,
  ["white"]: whiteButton,
};

const StyledButton = styled.button<{
  fullWidth?: boolean;
  color?: "primary" | "white";
  margin?: string;
}>`
  padding: 1em 2em;
  border-radius: 0.5em;
  font-weight: 600;
  cursor: pointer;
  border: 0;
  transition: 0.55s;

  ${(props) => ButtonStyles[props.color || "primary"]}
  ${(props) => props.fullWidth && `width: 100%;`}
  ${(props) => props.margin && `margin: ${props.margin};`}
`;
