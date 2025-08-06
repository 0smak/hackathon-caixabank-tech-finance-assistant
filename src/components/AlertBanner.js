import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { userSettingsStore } from "../stores/userSettingsStore";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import {
  getCategoriesAmounts,
  sumTransactions,
} from "../lib/transactionsUtils";

function AlertBanner() {
  const transactions = useStore(transactionsStore);
  const userSettings = useStore(userSettingsStore);

  const { totalBudgetLimit, categoryLimits, alertsEnabled } = userSettings;

  if (!alertsEnabled) return null;

  const totalExpenses = sumTransactions(transactions);

  const overTotalBudget = totalExpenses > totalBudgetLimit;

  const categoryExpenses = getCategoriesAmounts(transactions);
  const exceededCategories = Object.keys(categoryLimits).filter((category) => {
    const limit = categoryLimits[category];
    const expenses = categoryExpenses[category];
    return expenses > limit;
  });

  return (
    <Box>
      <Collapse in={overTotalBudget}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          You have exceeded your total budget limit of {totalBudgetLimit} €!
        </Alert>
      </Collapse>

      {exceededCategories.map((category) => (
        <Alert severity="warning" sx={{ mb: 2 }} key={category}>
          You have exceeded your budget limit for {category} (
          {categoryLimits[category]} €)!
        </Alert>
      ))}
    </Box>
  );
}

export default AlertBanner;
