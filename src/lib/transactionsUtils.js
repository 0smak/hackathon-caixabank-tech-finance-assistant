import { TRANSACTION_TYPE } from "../constants/transactionType";

export const filterByExpenses = (transactions) =>
  transactions.filter(({ type }) => TRANSACTION_TYPE.EXPENSE === type);

export const sumTransactions = (transactions) =>
  transactions?.length === 0
    ? 0
    : transactions.reduce((acc, { amount, type }) => {
        if (TRANSACTION_TYPE.EXPENSE === type) {
          return acc + amount;
        }
        return acc;
      }, 0);

export const extractDatesFromTransactions = (transactions) =>
  transactions.reduce((acc, { date }) => {
    if (!acc.includes(date)) {
      acc.push(date);
    }
    return acc;
  }, []);

export const getDailyAverage = (totalAmount, uniqueDates) => {
  const numberOfDays = uniqueDates.length;
  return numberOfDays > 0 ? totalAmount / numberOfDays : 0;
};

export const getCategoriesAmounts = (transactions) =>
  transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {});

export const getMaxCategoryAmount = (categoriesAmounts) =>
  Object.entries(categoriesAmounts).sort(([_, a], [__, b]) => b - a)?.[0]?.[0];

export const sortTransactions = (transactions, latestFirst = true) =>
  transactions.sort((a, b) => {
    if (latestFirst) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

export const getNTransactions = (transactions, n) => transactions.slice(0, n);

export const filterTransactionsByMonth = (transactions, month, year) => {
  return transactions.filter((transaction) => {
    const transactionYear = new Date(transaction.date).getFullYear();
    const transactionMonth = new Date(transaction.date).getMonth();
    return transactionYear === year && transactionMonth === month;
  });
};

export const calculateHistoricalBalance = (transactions) =>
  sortTransactions(transactions, false).reduce((acc, transaction) => {
    const multiplier = transaction.type === TRANSACTION_TYPE.EXPENSE ? -1 : 1;
    if (acc.length === 0) {
      acc.push({
        date: transaction.date,
        balance: transaction.amount * multiplier,
      });
    } else {
      const lastItem = acc[acc.length - 1];
      acc.push({
        date: transaction.date,
        balance: lastItem.balance + transaction.amount * multiplier,
      });
    }
    return acc;
  }, []);

export const getMonthlyExpenses = (transactions) => {
  const monthlyExpenses = filterByExpenses(transactions).reduce(
    (acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      const year = new Date(transaction.date).getFullYear();
      const key = `${year}-${month}`;
      if (!acc[key]) {
        acc[key] = {
          expense: 0,
        };
      }
      acc[key][transaction.type] += transaction.amount;
      return acc;
    },
    {}
  );

  return Object.entries(monthlyExpenses).map(([key, { expense }]) => ({
    key,
    expense,
  }));
};
