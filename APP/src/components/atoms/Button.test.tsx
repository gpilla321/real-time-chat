import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import { COLOR } from "../consts";

describe("Button tests", () => {
  test("Rendering with text", async () => {
    render(<Button text="I am a button" />);
    expect(screen.getByRole("button")).toHaveTextContent("I am a button");
  });

  test("Rendering with full width", async () => {
    render(<Button text="I am a button" fullWidth />);
    expect(screen.getByRole("button")).toHaveStyle("width: 100%");
  });

  test("Rendering default button style", async () => {
    render(<Button text="I am a button" />);
    expect(screen.getByRole("button")).toHaveStyle(
      `background-color: ${COLOR.primary}`
    );
  });

  test("Rendering primary button", async () => {
    render(<Button text="I am a button" color="primary" />);
    expect(screen.getByRole("button")).toHaveStyle(
      `background-color: ${COLOR.primary}`
    );
    expect(screen.getByRole("button")).toHaveStyle(`color: ${COLOR.white}`);
  });

  test("Rendering white button", async () => {
    render(<Button text="I am a button" color="white" />);
    expect(screen.getByRole("button")).toHaveStyle(
      `background-color: ${COLOR.white}`
    );
    expect(screen.getByRole("button")).toHaveStyle(`color: ${COLOR.darkGray}`);
  });

  test("Rendering with margin", async () => {
    const margin = "10px 10px 10px 10px";
    render(<Button text="I am a button" color="white" margin={margin} />);
    expect(screen.getByRole("button")).toHaveStyle(`margin: ${margin}`);
  });
  test("Button click triggers onClick handler", async () => {
    const handleClick = jest.fn();
    render(<Button text="I am a button" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
