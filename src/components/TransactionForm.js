import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import { useEffect, useState, memo } from "react";
import { categoryKeywords } from "../constants/categoryKeywords";
import {
  addTransaction,
  getTransactionById,
  updateTransaction,
} from "../stores/transactionStore";
import { DateUtils } from "../lib/dateUtils";
import { generateId } from "../lib/generateId";
import { matchCategory } from "../lib/matchCategory";
import { validateCategory } from "../validators/transactionForm/category";
import { validateEmptyFields } from "../validators/transactionForm/emptyFields";
import { validateTransactionType } from "../validators/transactionForm/transactionType";
import AmountField from "./TransactionFields/AmountField";
import CategorySelect from "./TransactionFields/CategorySelect";
import DescriptionField from "./TransactionFields/DescriptionField";
import TransactionDatePicker from "./TransactionFields/TransactionDatePicker";
import TransactionTypeSelect from "./TransactionFields/TransactionTypeSelect";
import { useNotification } from "../Context/NotificationContext";
import { validateDate } from "../validators/transactionForm/validateDate";

function TransactionForm({ transactionToEdit, onClose }) {
  const currentTransaction = getTransactionById(transactionToEdit);
  const { showNotification } = useNotification();

  const [description, setDescription] = useState(
    currentTransaction.description
  );
  const [amount, setAmount] = useState(currentTransaction.amount);
  const [type, setType] = useState(currentTransaction.type);
  const [category, setCategory] = useState(currentTransaction.category);
  const [date, setDate] = useState(currentTransaction.date);
  const [errorMessage, setErrorMessage] = useState("");

  const assignCategory = (desc) => {
    return matchCategory(desc, categoryKeywords);
  };

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(currentTransaction.description);
      setAmount(currentTransaction.amount);
      setType(currentTransaction.type);
      setCategory(currentTransaction.category);
      setDate(currentTransaction.date);
    }
  }, [transactionToEdit, currentTransaction]);

  useEffect(() => {
    if (!transactionToEdit) {
      const category = assignCategory(description);
      setCategory(category);
    }
  }, [description, transactionToEdit]);

  const getUpdatedFields = () => {
    const updatedFields = {};
    if (description !== currentTransaction.description) {
      updatedFields.description = description;
    }
    if (amount !== currentTransaction.amount) {
      updatedFields.amount = Number(amount);
    }
    if (type !== currentTransaction.type) {
      updatedFields.type = type;
    }
    if (category !== currentTransaction.category) {
      updatedFields.category = category;
    }
    if (date !== currentTransaction.date) {
      updatedFields.date = date;
    }
    return updatedFields;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    let errMsg = "";
    if (!validateEmptyFields({ description, amount, type, category, date })) {
      errMsg = "Please fill in all fields";
    }

    if (!validateCategory(category)) {
      errMsg = "Invalid category";
    }

    if (!validateTransactionType(type)) {
      errMsg = "Invalid transaction type";
    }

    if (!validateDate(date)) {
      errMsg = "Invalid date format";
    }

    if (errMsg) {
      showNotification(errMsg);
      setErrorMessage(errMsg);
      return;
    }

    if (transactionToEdit) {
      const updatedFields = getUpdatedFields();
      updateTransaction(transactionToEdit, updatedFields);
    } else {
      addTransaction({
        id: generateId(),
        description,
        amount: Number(amount),
        type,
        category,
        date,
      });
    }
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <DescriptionField
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AmountField
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TransactionTypeSelect
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CategorySelect
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TransactionDatePicker
                value={new Date(date ?? null)}
                onChange={(e) => setDate(DateUtils.toIso(e))}
              />
            </Grid>
          </Grid>
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 2,
            }}
          >
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-transaction-button"
            >
              {transactionToEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default memo(TransactionForm);
