import { format } from "date-fns";

const getKeyFormat = (date, timeFrame) =>
  ({
    daily: format(new Date(date), "yyyy/MM/dd"),
    weekly: format(new Date(date), "yyyy/w").replace("/", " week:"),
    monthly: format(new Date(date), "yyyy/MM"),
    yearly: format(new Date(date), "yyyy"),
  }[timeFrame]);

export const getTimelineDataSet = (transactions, timeFrame) => {
  const dataMap = {};

  transactions.forEach((t) => {
    const monthYear = getKeyFormat(t.date, timeFrame);
    if (!dataMap[monthYear]) {
      dataMap[monthYear] = {
        income: 0,
        expense: 0,
      };
    }
    dataMap[monthYear][t.type] += t.amount;
  });

  return Object.entries(dataMap)
    .map(([key, { income, expense }]) => ({
      key,
      income,
      expense,
    }))
    .sort((a, b) => new Date(a.key) - new Date(b.key));
};

export const getBudgetVsExpensesDataSet = (transactions, budget) => {
  return transactions.map((expense) => {
    return {
      key: expense.key,
      actual: expense.expense,
      budget,
    };
  });
};
