import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
// ECMA Script Polyfills:
import "core-js/stable";
// Needed for the generator functions which are transpiled from your async await keywords
import "regenerator-runtime/runtime";

test("renders book search header", () => {
  render(<App />);
  const el = screen.getByText(/Book Search App/i);
  expect(el).toBeInTheDocument();
});

test("render input field", () => {
  render(<App />);
  const el = screen.getByRole("search");
  expect(el).toBeInTheDocument();
});

test("renders submit btn", () => {
  render(<App />);
  const el = screen.getByLabelText("submitBtn");
  expect(el).toBeInTheDocument();
});
