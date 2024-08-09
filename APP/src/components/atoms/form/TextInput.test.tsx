import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "./TextInput";
import { COLOR } from "../../consts";

describe("Text Input", () => {
  test("Render with a label", () => {
    const text = "This is a label";
    render(<TextInput label={text} />);
    const label = screen.getByText(text);
    expect(label).toBeInTheDocument();
  });

  test("Render with a placeholder", () => {
    const placeholder = "This is a placeholder";
    render(<TextInput placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test("Render a password", () => {
    render(<TextInput label="Password" isPassword={true} />);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  });

  test("Render an input with error", () => {
    render(<TextInput label="Password" isPassword={true} error={true} />);
    expect(screen.getByLabelText("Password")).toHaveStyle(`border-color: ${COLOR.red}`);
  });
});
