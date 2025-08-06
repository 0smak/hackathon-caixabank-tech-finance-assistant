import { TextField } from "@mui/material";

const DescriptionField = ({ value, onChange }) => {
  return (
    <TextField
      label="Description"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
      name="description"
    />
  );
};

export default DescriptionField;
