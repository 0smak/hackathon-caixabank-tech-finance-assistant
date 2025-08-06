import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TransactionTypeSelect = ({ value, onChange }) => {
  return (
    <FormControl fullWidth margin="normal" required>
      <InputLabel id="type-label">Type</InputLabel>
      <Select
        labelId="type-label"
        value={value}
        onChange={onChange}
        label="Type"
        name="type"
        inputProps={{ name: "filterTypeForm" }}
      >
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TransactionTypeSelect;
