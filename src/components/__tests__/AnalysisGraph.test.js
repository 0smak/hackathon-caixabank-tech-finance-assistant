import { render, screen } from "@testing-library/react";
import AnalysisGraph from "../AnalysisGraph";
import { transactionsStore } from "../../stores/transactionStore";
import { TRANSACTION_TYPE } from "../../constants/transactionType";
import { act } from "react";

const initialTransactions = [
  { id: 1, category: "Food", type: TRANSACTION_TYPE.EXPENSE, amount: 50 },
  { id: 2, category: "Salary", type: TRANSACTION_TYPE.INCOME, amount: 1500 },
  { id: 3, category: "Food", type: TRANSACTION_TYPE.EXPENSE, amount: 30 },
  { id: 4, category: "Education", type: TRANSACTION_TYPE.INCOME, amount: 200 },
];

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={400}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe("AnalysisGraph Component", () => {
  beforeEach(() => {
    act(() => {
      transactionsStore.set(initialTransactions);
    });
  });

  it("renders graph with correct data", () => {
    render(<AnalysisGraph />);

    expect(
      screen.getByText("Income and Expenses by Category")
    ).toBeInTheDocument();

    expect(screen.getByText("🍎")).toBeInTheDocument();
    expect(screen.getByText("💰")).toBeInTheDocument();
    expect(screen.getByText("📚")).toBeInTheDocument();
  });

  it("updates graph when transactions data changes", () => {
    render(<AnalysisGraph />);

    expect(screen.getByText("🍎")).toBeInTheDocument();
    expect(screen.getByText("💰")).toBeInTheDocument();
    expect(screen.getByText("📚")).toBeInTheDocument();

    act(() => {
      transactionsStore.set([
        { id: 1, category: "Food", type: TRANSACTION_TYPE.EXPENSE, amount: 60 },
        {
          id: 2,
          category: "Salary",
          type: TRANSACTION_TYPE.INCOME,
          amount: 2000,
        },
        {
          id: 3,
          category: "Housing",
          type: TRANSACTION_TYPE.EXPENSE,
          amount: 500,
        },
      ]);
    });

    expect(screen.getByText("🏠")).toBeInTheDocument();
    expect(screen.queryByText("📚")).not.toBeInTheDocument();
  });
});
