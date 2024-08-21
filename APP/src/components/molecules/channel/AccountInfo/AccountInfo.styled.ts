import styled from "styled-components";
import { COLOR } from "../../../consts";

const StyledAccount = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${COLOR.white};
  background-color: ${COLOR.primary};
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

export { StyledAccount, StyledAccountDetail };
