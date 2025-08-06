import { allCategories } from "../constants/categories";

export const getEmojiByCategoryName = (category) => {
  return allCategories.find(({ name }) => name === category)?.emoji;
};
