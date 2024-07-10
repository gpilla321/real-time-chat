import { createContext, ReactNode, useContext, useState } from "react";
import { Channel, useListUsersQuery, User } from "../../graphql/schema";

// Removed children from the context props interface
export interface UserContextProps {
  users: User[];
  currentUser: User | null;
}

const UserContext = createContext<UserContextProps>({
  users: [],
  currentUser: null,
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useListUsersQuery();
  const [currentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "{}") ?? null
  );

  return (
    <UserContext.Provider value={{ users: data?.listUsers || [], currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
