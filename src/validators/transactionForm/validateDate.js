export const validateDate = (date) => {
  return date.length === 10 && date.match(/^\d{4}-\d{2}-\d{2}$/);
};
