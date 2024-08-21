import { useUserContext } from "../../../../contexts/userContext";
import useLogout from "../../../../hooks/useLogout";
import Button from "../../../atoms/Button/Button";
import { StyledAccount, StyledAccountDetail } from "./AccountInfo.styled";

const AccountInfo = () => {
  const { currentUser } = useUserContext();
  const { logout } = useLogout();
  return (
    <StyledAccount>
      <StyledAccountDetail>
        Logged as: {currentUser?.name || "No user selected"}
        <Button text="Logout" color="white" onClick={logout} />
      </StyledAccountDetail>
    </StyledAccount>
  );
};

export default AccountInfo;
