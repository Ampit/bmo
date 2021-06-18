import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders book search header", () => {
  render(<App />);
  const el = screen.getByText(/Book Search App/i);
  expect(el).toBeInTheDocument();
});
