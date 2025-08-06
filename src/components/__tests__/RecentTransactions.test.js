import { useStore } from "@nanostores/react";
import { render, screen } from "@testing-library/react";
import RecentTransactions from "../RecentTransactions";

jest.mock("@nanostores/react");

describe("RecentTransactions Component", () => {
  beforeEach(() => {
    useStore.mockReturnValue([
      {
        id: "2",
        description: "Groceries",
        amount: -50,
        type: "expense",
        category: "Food",
        date: "2024-10-27",
      },
      {
        id: "1",
        description: "Money transfer",
        amount: 1000,
        type: "income",
        category: "Salary",
        date: "2024-10-26",
      },
    ]);
  });

  it("should render recent transactions correctly", () => {
    render(<RecentTransactions />);

    expect(screen.getByText("Recent Transactions")).toBeInTheDocument();

    expect(screen.getByText("Money transfer")).toBeInTheDocument();
    expect(screen.getByText("1000,00 €")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText(/Salary/)).toBeInTheDocument();
    expect(screen.getByText("26/10/2024")).toBeInTheDocument();

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("-50,00 €")).toBeInTheDocument();
    expect(screen.getByText("Expense")).toBeInTheDocument();
    expect(screen.getByText(/Food/)).toBeInTheDocument();
    expect(screen.getByText("27/10/2024")).toBeInTheDocument();
  });

  it("should not render any transactions if no transactions are available", () => {
    useStore.mockReturnValue([]);

    render(<RecentTransactions />);

    expect(screen.queryByText("Expense")).not.toBeInTheDocument();
    expect(screen.queryByText("Income")).not.toBeInTheDocument();
  });
});
