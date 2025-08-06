import NoTransactions from "./NoTransactions";
import TimelineChart from "./TimelineChart";

function MonthlyChart({ data }) {
  return !!data?.length ? (
    <TimelineChart
      dataSet={data}
      lineConfig={[
        { key: "income", color: "#8bc34a", name: "Income" },
        { key: "expense", color: "#ff1744", name: "Expense" },
      ]}
    />
  ) : (
    <NoTransactions>There are no transactions available.</NoTransactions>
  );
}

export default MonthlyChart;
