import styled from "styled-components";
import { useUserContext } from "../../../contexts/userContext";
import useLogout from "../../../hooks/useLogout";
import Button from "../../atoms/button";
import { COLOR } from "../../consts";

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

const StyledAccount = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${COLOR.white};
`;

const StyledAccountDetail = styled.div`
  padding: 0 2em;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 0.875em;
  color: ${COLOR.white};
  justify-content: space-between;
`;
