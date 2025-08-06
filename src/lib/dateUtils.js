export const DateUtils = {
  toIso: (date) => date.toISOString().split("T")[0],
};

export const getPreviousMonth = (date) => {
  const currentMonth = new Date(date).getMonth();
  const currentYear = new Date(date).getFullYear();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  return { previousMonth, previousYear };
};
