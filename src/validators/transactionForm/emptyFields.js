export const validateEmptyFields = ({
  description,
  amount,
  type,
  category,
  date,
}) => {
  return (
    !!description.trim().length && !!amount && !!type && !!category && !!date
  );
};
