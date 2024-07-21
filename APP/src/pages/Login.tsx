import { useForm } from "react-hook-form";
import { StyledH3 } from "../components/common";
import TextInput from "../components/form/textInput";
import Button from "../components/button";
import styled from "styled-components";
import { useLoginMutation } from "../../graphql/schema";
import useLogin from "../hooks/useLogin";

type Login = {
  userName: string;
  password: string;
};

const Login = () => {
  const { login, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  console.log(errors);

  const onSubmit = (data: Login) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledFullHeight>
        <StyledWrapper>
          <StyledH3 fontWeight="600" marginBottom="1.25em">
            Login
          </StyledH3>
          <TextInput
            register={register("userName", {
              required: "You must fill the username",
            })}
            label="Username"
            error={{
              hasError: !!errors.userName,
              message: errors.userName?.message,
            }}
          />
          <TextInput
            register={register("password", {
              required: "You must fill the password",
            })}
            label="Password"
            error={{
              hasError: !!errors.password,
              message: errors.password?.message,
            }}
            isPassword
          />
          <Button text="Login" margin="0 0 1em 0" isSubmit fullWidth />
          <Button
            text="Create Account"
            color={"white"}
            fullWidth
            redirectTo="/create-account"
          />
        </StyledWrapper>
      </StyledFullHeight>
    </form>
  );
};

export default Login;

const StyledWrapper = styled.div`
  min-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 2em;
  border-radius: 0.5em;
`;

const StyledFullHeight = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
