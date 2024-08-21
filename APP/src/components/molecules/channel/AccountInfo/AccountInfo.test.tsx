import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountInfo from "./AccountInfo";
import { UserContext } from "../../../../contexts/userContext";
import { BrowserRouter } from "react-router-dom";

const renderAccountInfo = (name: string) =>
  render(
    <UserContext.Provider
      value={{
        currentUser: { name, username: "test", userId: "randomId" },
        isAuthenticated: true,
      }}
    >
      <BrowserRouter>
        <AccountInfo />
      </BrowserRouter>
    </UserContext.Provider>
  );

describe("Molecule: AccountInfo ", () => {
  test("rendering component", () => {
    renderAccountInfo("John Doe");
  });
});
