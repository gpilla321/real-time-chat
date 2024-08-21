import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import { COLOR } from "../../consts";
import { v4 } from "uuid";

interface IProps {
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn<string>;
  isPassword?: boolean;
  error?: boolean;
}

const TextInput = ({
  label,
  placeholder,
  register,
  isPassword,
  error,
}: IProps) => {
  const id = v4();
  return (
    <StyledWrapper>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledTextInput
        id={id}
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        hasError={error || false}
        autoComplete="off"
        {...register}
      />
    </StyledWrapper>
  );
};

export default TextInput;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;
const StyledLabel = styled.label`
  margin-bottom: 0.5em;
  font-size: 0.875em;
  font-weight: 500;
`;
const StyledTextInput = styled.input<{ hasError: boolean }>`
  background-color: ${COLOR.lightGray} !important;
  padding: 0.75em 0;
  outline: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid ${COLOR.lightGray2};
  font-size: 1em;

  ${(props) =>
    props.hasError &&
    `
  border-color: ${COLOR.red};
  `}

  :-internal-autofill-selected {
    background-color: ${COLOR.white} !important;
  }
`;
