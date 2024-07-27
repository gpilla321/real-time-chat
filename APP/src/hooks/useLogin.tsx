import { useState } from "react";
import { useLoginMutation } from "../../graphql/schema";

interface Login {
  username: string;
  password: string;
}

const useLogin = () => {
  const [loginMutation] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const login = (data: Login) => {
    loginMutation({
      variables: {
        input: {
          ...data,
        },
      },
    })
      .then((res) => {
        if (!res.data || !res.data.login) return;

        const { data } = res.data.login;

        if (data) {
          storeToken(data.token, data.username, data.name, data.userId);
          setSuccess(true);
        }
      })
      .catch(() => {
        setError("Invalid username or password.");
      });
  };

  const storeToken = (
    jwt: string,
    userName: string,
    name: string,
    userId: string
  ) => {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify({ userName, name, userId }));
  };

  return { login, success, error };
};

export default useLogin;
