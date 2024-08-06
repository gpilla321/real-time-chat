import { useForm } from "react-hook-form";
import { StyledH3 } from "../components/atoms/Common";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DefaultLink from "../components/atoms/Link";
import { useCreateUserMutation } from "../../graphql/schema";
import TextInput from "../components/atoms/form/TextInput";

type CreateAccount = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccount>();
  const navigate = useNavigate();

  console.log(errors);

  const [createAccount] = useCreateUserMutation();

  const onSubmit = (data: CreateAccount) => {
    console.log("submit", data);

    createAccount({
      variables: {
        input: {
          ...data,
        },
      },
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledFullHeight>
        <DefaultLink to="/">I have an account</DefaultLink>
        <StyledWrapper>
          <StyledH3 fontWeight="600" marginBottom="1.25em">
            Create an Account
          </StyledH3>
          <TextInput
            register={register("name", {
              required: "You must fill the name",
            })}
            label="Name"
            error={{
              hasError: !!errors.name,
              message: errors.name?.message,
            }}
          />
          <TextInput
            register={register("username", {
              required: "You must fill the username",
            })}
            label="Username"
            error={{
              hasError: !!errors.username,
              message: errors.username?.message,
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
          <TextInput
            register={register("confirmPassword", {
              required: "You must fill the password",
            })}
            label="Confirm Password"
            error={{
              hasError: !!errors.confirmPassword,
              message: errors.confirmPassword?.message,
            }}
            isPassword
          />
          <Button text="Create account" margin="0 0 1em 0" isSubmit fullWidth />
        </StyledWrapper>
      </StyledFullHeight>
    </form>
  );
};

export default CreateAccount;

const StyledWrapper = styled.div`
  background-color: #fff;
  padding: 2em;
  border-radius: 0.5em;
  width: 100%;
  box-sizing: border-box;
`;

const StyledFullHeight = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
`;
