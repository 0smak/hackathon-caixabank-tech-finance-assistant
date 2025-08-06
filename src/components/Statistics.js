import { useStore } from "@nanostores/react";
import { getEmojiByCategoryName } from "../lib/getEmojiByCategory";
import {
  extractDatesFromTransactions,
  filterByExpenses,
  getCategoriesAmounts,
  getDailyAverage,
  getMaxCategoryAmount,
  sumTransactions,
} from "../lib/transactionsUtils";
import { transactionsStore } from "../stores/transactionStore";
import StatisticsCard from "./StatisticsCard";

function Statistics() {
  const transactions = useStore(transactionsStore);

  const expenses = filterByExpenses(transactions);

  const totalExpense = sumTransactions(expenses);

  const uniqueDates = extractDatesFromTransactions(expenses);

  const averageDailyExpense = getDailyAverage(totalExpense, uniqueDates);

  const categoryExpenses = getCategoriesAmounts(expenses);

  const maxCategory = getMaxCategoryAmount(categoryExpenses);

  const avgDailyExpenses = `Average Daily Expense: ${averageDailyExpense.toFixed(
    2
  )} €`;

  const highestSpendingCategory = `Highest Spending Category: 
    ${
      maxCategory
        ? `${getEmojiByCategoryName(
            maxCategory
          )} ${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
        : "No data available"
    }`;

  return (
    <StatisticsCard
      title={"Key Statistics"}
      messages={[avgDailyExpenses, highestSpendingCategory]}
    />
  );
}

export default Statistics;
