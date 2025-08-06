import {
  calculateHistoricalBalance,
  extractDatesFromTransactions,
  filterByExpenses,
  filterTransactionsByMonth,
  getDailyAverage,
  getNTransactions,
  sortTransactions,
  sumTransactions,
} from "../transactionsUtils";

const transactionsMockData = [
  {
    id: "m2qfabje1tpc893m",
    description: "Web Dev Salary",
    amount: 1000,
    type: "income",
    category: "Salary",
    date: "2024-10-26",
  },
  {
    id: "m2q50s7e8wpfe0e1",
    description: "My medicines",
    amount: 20,
    type: "expense",
    category: "Health",
    date: "2024-09-15",
  },
  {
    id: "m2rh7cb2h02cjpzb",
    description: "Birthday gift",
    amount: 11,
    type: "expense",
    category: "Gifts and Donations",
    date: "2024-10-27",
  },
  {
    id: "m2rkjf8qvsfwek3l",
    description: "Smartphone",
    amount: 800,
    type: "expense",
    category: "Entertainment",
    date: "2024-08-06",
  },
];

const incomesMockData = [
  {
    id: "m2qfabje1tpc893m",
    description: "Web Dev Salary",
    amount: 1000,
    type: "income",
    category: "Salary",
    date: "2024-10-26",
  },
];

const expensesMockData = [
  {
    id: "m2q50s7e8wpfe0e1",
    description: "My medicines",
    amount: 20,
    type: "expense",
    category: "Health",
    date: "2024-09-15",
  },
  {
    id: "m2rh7cb2h02cjpzb",
    description: "Birthday gift",
    amount: 11,
    type: "expense",
    category: "Gifts and Donations",
    date: "2024-10-27",
  },
  {
    id: "m2rkjf8qvsfwek3l",
    description: "Smartphone",
    amount: 800,
    type: "expense",
    category: "Entertainment",
    date: "2024-08-06",
  },
];

describe("Transactions Utils", () => {
  describe("filterByExpenses", () => {
    it("should return only expenses", () => {
      expect(filterByExpenses(transactionsMockData)).toEqual(expensesMockData);
    });

    it("should return empty array if no expenses", () => {
      expect(filterByExpenses(incomesMockData)).toEqual([]);
    });

    it("should return the same array if no incomes", () => {
      expect(filterByExpenses(expensesMockData)).toEqual(expensesMockData);
    });

    it("Should return an array if no transactions", () => {
      expect(filterByExpenses([])).toEqual([]);
    });
  });

  describe("sumTransactions", () => {
    it("should return the sum of all expenses transactions", () => {
      expect(sumTransactions(expensesMockData)).toEqual(20 + 11 + 800);
    });

    it("Should ignore income transactions on sum", () => {
      expect(sumTransactions(incomesMockData)).toEqual(0);
      expect(sumTransactions(transactionsMockData)).toEqual(20 + 11 + 800);
    });

    it("should return 0 if no transactions", () => {
      expect(sumTransactions([])).toEqual(0);
    });
  });

  describe("Extract Dates From Transactions", () => {
    it("should return an array of dates", () => {
      expect(extractDatesFromTransactions(transactionsMockData)).toEqual([
        "2024-10-26",
        "2024-09-15",
        "2024-10-27",
        "2024-08-06",
      ]);
    });

    it("should return an empty array if no transactions", () => {
      expect(extractDatesFromTransactions([])).toEqual([]);
    });
  });

  describe("Get Daily Average", () => {
    it("should return the average of daily expenses", () => {
      expect(getDailyAverage(2000, ["2024-10-26", "2024-10-27"])).toEqual(1000);
    });

    it("should return 0 if no dates", () => {
      expect(getDailyAverage(2000, [])).toEqual(0);
    });

    it("should return 0 if no expenses", () => {
      expect(getDailyAverage(0, ["2024-10-26", "2024-10-27"])).toEqual(0);
    });
  });

  describe("Sort Transactions", () => {
    it("should sort transactions by date in ascending order", () => {
      expect(sortTransactions([...transactionsMockData], false)).toEqual([
        {
          id: "m2rkjf8qvsfwek3l",
          description: "Smartphone",
          amount: 800,
          type: "expense",
          category: "Entertainment",
          date: "2024-08-06",
        },
        {
          id: "m2q50s7e8wpfe0e1",
          description: "My medicines",
          amount: 20,
          type: "expense",
          category: "Health",
          date: "2024-09-15",
        },
        {
          id: "m2qfabje1tpc893m",
          description: "Web Dev Salary",
          amount: 1000,
          type: "income",
          category: "Salary",
          date: "2024-10-26",
        },
        {
          id: "m2rh7cb2h02cjpzb",
          description: "Birthday gift",
          amount: 11,
          type: "expense",
          category: "Gifts and Donations",
          date: "2024-10-27",
        },
      ]);
    });

    it("should sort transactions by date in descending order", () => {
      expect(sortTransactions([...transactionsMockData])).toEqual([
        {
          id: "m2rh7cb2h02cjpzb",
          description: "Birthday gift",
          amount: 11,
          type: "expense",
          category: "Gifts and Donations",
          date: "2024-10-27",
        },
        {
          id: "m2qfabje1tpc893m",
          description: "Web Dev Salary",
          amount: 1000,
          type: "income",
          category: "Salary",
          date: "2024-10-26",
        },
        {
          id: "m2q50s7e8wpfe0e1",
          description: "My medicines",
          amount: 20,
          type: "expense",
          category: "Health",
          date: "2024-09-15",
        },
        {
          id: "m2rkjf8qvsfwek3l",
          description: "Smartphone",
          amount: 800,
          type: "expense",
          category: "Entertainment",
          date: "2024-08-06",
        },
      ]);
    });
    it("should return an empty array if no transactions", () => {
      expect(sortTransactions([])).toEqual([]);
    });
  });
  describe("Get N Transactions", () => {
    it("should return the first 2 transactions", () => {
      expect(getNTransactions(transactionsMockData, 2)).toEqual([
        {
          id: "m2qfabje1tpc893m",
          description: "Web Dev Salary",
          amount: 1000,
          type: "income",
          category: "Salary",
          date: "2024-10-26",
        },
        {
          id: "m2q50s7e8wpfe0e1",
          description: "My medicines",
          amount: 20,
          type: "expense",
          category: "Health",
          date: "2024-09-15",
        },
      ]);
    });

    it("should return all transactions if n is greater than transactions length", () => {
      expect(getNTransactions(transactionsMockData, 100)).toEqual(
        transactionsMockData
      );
    });

    it("should return an empty array if no transactions", () => {
      expect(getNTransactions([], 2)).toEqual([]);
    });
  });

  describe("Filter Transactions By Month", () => {
    it("should return transactions from the specified month", () => {
      expect(filterTransactionsByMonth(transactionsMockData, 9, 2024)).toEqual([
        {
          id: "m2qfabje1tpc893m",
          description: "Web Dev Salary",
          amount: 1000,
          type: "income",
          category: "Salary",
          date: "2024-10-26",
        },
        {
          id: "m2rh7cb2h02cjpzb",
          description: "Birthday gift",
          amount: 11,
          type: "expense",
          category: "Gifts and Donations",
          date: "2024-10-27",
        },
      ]);
    });

    it("should return an empty array if no transactions", () => {
      expect(filterTransactionsByMonth([], 10, 2025)).toEqual([]);
    });

    it("should return an empty array if no transactions in the specified month", () => {
      expect(filterTransactionsByMonth(transactionsMockData, 9, 2055)).toEqual(
        []
      );
    });
  });
  describe("Calculate Historical Balance", () => {
    it("should return the balance for each transaction", () => {
      expect(calculateHistoricalBalance(transactionsMockData)).toEqual([
        { date: "2024-08-06", balance: -800 },
        { date: "2024-09-15", balance: -820 },
        { date: "2024-10-26", balance: 180 },
        { date: "2024-10-27", balance: 169 },
      ]);
    });

    it("should return an empty array if no transactions", () => {
      expect(calculateHistoricalBalance([])).toEqual([]);
    });
  });
});
