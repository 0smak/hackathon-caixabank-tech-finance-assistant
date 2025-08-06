export const matchCategory = (description, keywords) => {
  const match = Object.keys(keywords).find((key) =>
    keywords[key].some((keyword) => description.includes(keyword))
  );

  return match || "Other Expenses";
};
