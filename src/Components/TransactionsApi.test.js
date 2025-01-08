import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TransactionsApi from "./TransactionsApi";

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          customerId: "123",
          month: "January",
          points: 90,
          transactions: [120],
        },
      ]),
  })
);

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe("TransactionsApi", () => {
  test("renders loading initially", () => {
    render(<TransactionsApi />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders customer rewards data after fetching", async () => {
    render(<TransactionsApi />);

    await waitFor(() => expect(screen.getByText(/Customer: 123/i)).toBeInTheDocument());

    expect(screen.getByText(/January/i)).toBeInTheDocument();
    expect(screen.getByText(/Points: 90/i)).toBeInTheDocument();
  });
});
