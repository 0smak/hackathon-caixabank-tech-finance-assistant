import { CircularProgress, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";
import { Suspense } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TRANSACTION_TYPE } from "../constants/transactionType";
import { getEmojiByCategoryName } from "../lib/getEmojiByCategory";
import { transactionsStore } from "../stores/transactionStore";

function AnalysisGraph() {
  const transactions = useStore(transactionsStore);

  const categories = transactions.reduce((acc, transaction) => {
    if (!acc.includes(transaction.category)) {
      acc.push(transaction.category);
    }
    return acc;
  }, []);

  const data = categories.map((category) => ({
    category,
    Income: transactions
      .filter((transaction) => transaction.category === category)
      .reduce(
        (total, transaction) =>
          transaction.type === TRANSACTION_TYPE.INCOME
            ? total + transaction.amount
            : total,
        0
      ),
    Expense: transactions
      .filter((transaction) => transaction.category === category)
      .reduce(
        (total, transaction) =>
          transaction.type === TRANSACTION_TYPE.EXPENSE
            ? total + transaction.amount
            : total,
        0
      ),
  }));

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Income and Expenses by Category
      </Typography>
      <Suspense fallback={<CircularProgress />}>
        {!!data?.length ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis
                dataKey="category"
                tickMargin={5}
                tickFormatter={(value) => getEmojiByCategoryName(value)}
              ></XAxis>
              <YAxis tickMargin={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background-color)",
                }}
                labelFormatter={(value) => (
                  <span className="text-color">
                    {getEmojiByCategoryName(value)}&nbsp;&nbsp;{value}
                  </span>
                )}
                cursor={false}
              />
              <Legend />
              <Bar
                barSize={16}
                dataKey="Income"
                stackId="inc"
                fill="#82ca9d"
                radius={[10, 10, 0, 0]}
              />
              <Bar
                barSize={16}
                dataKey="Expense"
                stackId="exp"
                fill="#8884d8"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography component="p" sx={{ mt: 1 }}>
            There are no transactions available.
          </Typography>
        )}
      </Suspense>
    </>
  );
}

export default AnalysisGraph;
