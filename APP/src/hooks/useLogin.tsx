import { useState } from "react";
import { useLoginMutation } from "../../graphql/schema";
import { useNavigate } from "react-router-dom";

interface Login {
  userName: string;
  password: string;
}

const useLogin = () => {
  const [loginMutation] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = (data: Login) => {
    loginMutation({
      variables: {
        input: {
          ...data,
        },
      },
    })
      .then((res) => {
        console.log("res =>", res);
        if (!res.data || !res.data.login) return;

        const { data } = res.data.login;

        if (data) {
          storeToken(data.token, data.userName);
          navigate("/workspace");
        }
      })
      .catch(() => {
        setError("Invalid username or password.");
      });
  };

  const storeToken = (jwt: string, userName: string) => {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("userName", userName);
  };

  return { login, error };
};

export default useLogin;