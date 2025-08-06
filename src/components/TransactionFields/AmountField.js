import { TextField } from "@mui/material";

const AmountField = ({ value, onChange }) => {
  return (
    <TextField
      label="Amount (€)"
      type="number"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
      InputProps={{
        inputProps: {
          min: 0,
          step: "0.01",
        },
      }}
      name="amount"
    />
  );
};

export default AmountField;
