import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useStore } from "@nanostores/react";
import { useRecommendations } from "../hooks/useRecommendations";
import { transactionsStore } from "../stores/transactionStore";
import { getPreviousMonth } from "../lib/dateUtils";
import { getRecommendations } from "../lib/recommendations";
import {
  filterByExpenses,
  filterTransactionsByMonth,
  sumTransactions,
} from "../lib/transactionsUtils";
import StatisticsCard from "./StatisticsCard";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const { loading, error, setError } = useRecommendations();

  if (loading) {
    return (
      <StatisticsCard
        title="Recommendations"
        component={"div"}
        messages={[
          <Skeleton height={22} />,
          <Skeleton height={22} width={"75%"} />,
        ]}
      />
    );
  }

  if (error) {
    return (
      <>
        <StatisticsCard
          title="Recommendations"
          component={"div"}
          messages={[
            <>
              <Typography color="error" mt={1}>
                {error}&nbsp;
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => setError(null)}
              >
                Try again
              </Button>
            </>,
          ]}
        />
      </>
    );
  }

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { previousMonth, previousYear } = getPreviousMonth(new Date());

  const transactionsThisMonth = filterTransactionsByMonth(
    filterByExpenses(transactions),
    currentMonth,
    currentYear
  );

  const transactionsLastMonth = filterTransactionsByMonth(
    filterByExpenses(transactions),
    previousMonth,
    previousYear
  );

  const expenseThisMonth = sumTransactions(transactionsThisMonth);
  const expenseLastMonth = sumTransactions(transactionsLastMonth);

  const recommendations = getRecommendations({
    expenseLastMonth,
    expenseThisMonth,
  });

  return (
    <StatisticsCard title="Recommendations" messages={[recommendations]} />
  );
}

export default Recommendations;
