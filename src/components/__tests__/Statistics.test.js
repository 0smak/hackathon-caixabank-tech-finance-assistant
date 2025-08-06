import { render, screen } from "@testing-library/react";
import Statistics from "../Statistics";
import {
  extractDatesFromTransactions,
  filterByExpenses,
  getCategoriesAmounts,
  getDailyAverage,
  getMaxCategoryAmount,
  sumTransactions,
} from "../../lib/transactionsUtils";

jest.mock("../../lib/transactionsUtils", () => ({
  extractDatesFromTransactions: jest.fn(),
  filterByExpenses: jest.fn(),
  getCategoriesAmounts: jest.fn(),
  getDailyAverage: jest.fn(),
  getMaxCategoryAmount: jest.fn(),
  sumTransactions: jest.fn(),
}));

describe("Statistics Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display correct statistics when transactions data is available", () => {
    extractDatesFromTransactions.mockReturnValue(["2024-10-01", "2024-10-02"]);
    getDailyAverage.mockReturnValue(175);
    getCategoriesAmounts.mockReturnValue({
      Food: 100,
      Transport: 50,
      Entertainment: 200,
    });
    getMaxCategoryAmount.mockReturnValue("Entertainment");

    render(<Statistics />);

    expect(screen.getByText("Key Statistics")).toBeInTheDocument();
    expect(
      screen.getByText("Average Daily Expense: 175.00 €")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Highest Spending Category: 🎮 Entertainment (200.00 €)")
    ).toBeInTheDocument();
  });

  it("should display 'No data available' when no transactions are present", () => {
    filterByExpenses.mockReturnValue([]);
    sumTransactions.mockReturnValue(0);
    extractDatesFromTransactions.mockReturnValue([]);
    getDailyAverage.mockReturnValue(0);
    getCategoriesAmounts.mockReturnValue({});
    getMaxCategoryAmount.mockReturnValue(null);

    render(<Statistics />);

    expect(screen.getByText("Key Statistics")).toBeInTheDocument();
    expect(
      screen.getByText("Average Daily Expense: 0.00 €")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Highest Spending Category: No data available")
    ).toBeInTheDocument();
  });
});
