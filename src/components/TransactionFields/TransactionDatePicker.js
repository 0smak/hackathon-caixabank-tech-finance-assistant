import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const TransactionDatePicker = ({ value, onChange }) => {
  return (
    <FormControl fullWidth margin="normal" required>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={value}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          name="date"
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default TransactionDatePicker;
