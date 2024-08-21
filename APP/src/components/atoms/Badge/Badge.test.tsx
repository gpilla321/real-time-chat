import { render, screen } from "@testing-library/react";
import Badge from "./Badge";
import "@testing-library/jest-dom";

describe("Badge testing", () => {
  test("Rendering with text", () => {
    const text = "I am a badge";
    render(<Badge text={text} />);
    const badge = screen.getByText(text);
    expect(badge).toBeInTheDocument();
  });
});
