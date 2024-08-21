import { createContext, ReactNode, useContext, useState } from "react";

export interface LoggedUser {
  name: string;
  username: string;
  userId: string;
}

export interface UserContextProps {
  currentUser: LoggedUser | null;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextProps>({
  currentUser: null,
  isAuthenticated: false,
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser] = useState<LoggedUser | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );

  const isAuthenticated = currentUser != null;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext, UserContext };
