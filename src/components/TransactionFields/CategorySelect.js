import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { allCategories } from "../../constants/categories";

const CategorySelect = ({ value, onChange }) => {
  return (
    <FormControl fullWidth margin="normal" required>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        value={value}
        onChange={onChange}
        label="Category"
        name="category"
        inputProps={{ name: "filterCategoryForm" }}
      >
        {allCategories
          .filter((category) => category.name !== "Other Expenses")
          .map((category, idx) => (
            <MenuItem value={category.name} key={idx}>
              {category.emoji} {category.name}
            </MenuItem>
          ))}
        <MenuItem value="Other Expenses">Other Expenses</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
