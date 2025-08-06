import { allCategories } from "../../constants/categories";

export const validateCategory = (category) => {
  return allCategories.some(({ name }) => name === category);
};
