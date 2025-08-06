export const getRecommendations = ({ expenseLastMonth, expenseThisMonth }) => {
  if (expenseLastMonth === 0)
    return "This is your first month recording expenses. Keep it up!";
  if (expenseThisMonth > expenseLastMonth) {
    const percentageIncrease =
      ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) * 100;
    return `Your expenses have increased by ${percentageIncrease.toFixed(
      2
    )}%, You should consider check your expenses.`;
  }
  if (expenseThisMonth < expenseLastMonth) {
    const percentageDecrease =
      ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) * 100;
    return `Your expenses have decreased by ${percentageDecrease.toFixed(
      2
    )}%, that's good! You can still keep recording expenses.`;
  }
  if (expenseThisMonth === expenseLastMonth) {
    return "Your expenses have not changed this month! Keep it up!";
  }
};
