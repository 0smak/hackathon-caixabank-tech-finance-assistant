import BarGraph from "./BarGraph";

const BudgetVsExpenses = ({ data }) => {
  return (
    <BarGraph
      dataSet={data}
      barConfig={[
        { key: "actual", color: "#82ca9d", name: "Expense" },
        { key: "budget", color: "#8884d8", name: "Budget" },
      ]}
    />
  );
};

export default BudgetVsExpenses;
