import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { transactionsStore } from "../stores/transactionStore";
import { Alert } from "@mui/material";
import {
  budgetAlertStore,
  resetBudgetAlert,
  updateBudgetAlert,
} from "../stores/budgetAlertStore";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TRANSACTION_TYPE } from "../constants/transactionType";

const BudgetAlert = () => {
  useLocalStorage(budgetAlertStore, "budgetAlert");
  useLocalStorage(transactionsStore, "transactions");
  useLocalStorage(userSettingsStore, "userSettings");
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);
  const budgetAlert = useStore(budgetAlertStore);

  const [totalExpense, setTotalExpense] = useState(0);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [budgetExceedInCategories, setBudgetExceedInCategories] = useState([]);

  useEffect(() => {
    const exceededByCategory = Object.keys(userSettings.categoryLimits).reduce(
      (acc, category) => {
        const limit = userSettings.categoryLimits[category];
        const totalExpenseInCategory = transactions.reduce(
          (total, transaction) => {
            if (
              transaction.type === TRANSACTION_TYPE.EXPENSE &&
              transaction.category === category
            ) {
              return total + transaction.amount;
            }
            return total;
          },
          0
        );
        return totalExpenseInCategory > limit ? [...acc, category] : acc;
      },
      []
    );
    setBudgetExceedInCategories(exceededByCategory);
  }, [transactions, userSettings.categoryLimits]);

  useEffect(() => {
    const totalExpense = transactions.reduce((total, transaction) => {
      if (transaction.type === TRANSACTION_TYPE.EXPENSE) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
    setTotalExpense(totalExpense);
  }, [transactions]);

  useEffect(() => {
    const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;
    setBudgetExceeded(budgetExceeded);
  }, [totalExpense, userSettings.totalBudgetLimit]);

  useEffect(() => {
    const someCategoryExceeded = budgetExceedInCategories.length > 0;
    const exceededAmount = userSettings.totalBudgetLimit - totalExpense;
    const categoriesExceeded = budgetExceedInCategories.join(", ");
    if (budgetExceeded && someCategoryExceeded) {
      updateBudgetAlert(`
        Your global budget limit has been exceeded by ${exceededAmount} €, also you have exceeded the budget limit for the following categories: ${categoriesExceeded}.
      `);
    } else if (budgetExceeded && !someCategoryExceeded) {
      updateBudgetAlert(`
          Your global budget limit has been exceeded by ${exceededAmount} €.
        `);
    } else if (!budgetExceeded && someCategoryExceeded) {
      updateBudgetAlert(`
          You have exceeded the budget limit for the following categories: ${categoriesExceeded}.
        `);
    } else {
      resetBudgetAlert();
    }
  }, [
    budgetExceeded,
    budgetExceedInCategories,
    userSettings.totalBudgetLimit,
    totalExpense,
  ]);

  return budgetAlert.isVisible ? (
    <Alert
      severity="warning"
      sx={{ mt: 0, mx: { xs: 0, md: 4 }, mb: { xs: 4, sm: 1, md: 0 } }}
      onClose={() => resetBudgetAlert()}
    >
      {budgetAlert.message}
    </Alert>
  ) : null;
};

export default BudgetAlert;
