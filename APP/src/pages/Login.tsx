import { useForm } from "react-hook-form";
import { StyledH3 } from "../components/atoms/Common/Common";
import styled from "styled-components";
import useLogin from "../hooks/useLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/atoms/TextInput/TextInput";
import Button from "../components/atoms/Button/Button";

type Login = {
  username: string;
  password: string;
};

const Login = () => {
  const { login, success } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const navigate = useNavigate();

  const onSubmit = (data: Login) => {
    login(data);
  };

  const onClickCreateAccount = () => {
    navigate("/create-account");
  };

  useEffect(() => {
    if (success) {
      navigate("/workspace");
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledFullHeight>
        <StyledWrapper>
          <StyledH3 fontWeight="600" marginBottom="1.25em">
            Login
          </StyledH3>
          <TextInput
            register={register("username", {
              required: "You must fill the username",
            })}
            label="Username"
            error={!!errors.username}
          />
          <TextInput
            register={register("password", {
              required: "You must fill the password",
            })}
            label="Password"
            error={!!errors.password}
            isPassword
          />
          <Button text="Login" margin="0 0 1em 0" isSubmit fullWidth />
          <Button
            text="Create Account"
            color={"white"}
            fullWidth
            onClick={onClickCreateAccount}
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
