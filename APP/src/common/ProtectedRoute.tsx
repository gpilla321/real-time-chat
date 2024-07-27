import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useUserContext();

  console.log("isAuth", children);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
