import React from "react";
import { render, screen } from "@testing-library/react";
import MainComponent from "./MainComponent";

// Group related test cases with 'describe'
describe("MainComponent", () => {
  test("renders TransactionsApi component", () => {
    render(<MainComponent />);

    // Check if the TransactionsApi component's output is rendered
    expect(screen.getByText(/Customer Rewards Program/i)).toBeInTheDocument();
  });
});
