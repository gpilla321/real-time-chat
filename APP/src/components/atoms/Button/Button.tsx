import { StyledButton } from "./Button.style";

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
