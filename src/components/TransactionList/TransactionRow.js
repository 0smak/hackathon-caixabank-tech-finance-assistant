import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { TRANSACTION_TYPE } from "../../constants/transactionType";
import Badge from "../Badge";
import { allCategories } from "../../constants/categories";

const TransactionRow = ({ transaction, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        <strong>{transaction.description}</strong>
      </TableCell>
      <TableCell>
        {new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(transaction.amount)}
      </TableCell>
      <TableCell>
        <Badge
          type={
            transaction.type === TRANSACTION_TYPE.INCOME ? "success" : "error"
          }
        >
          {transaction.type}
        </Badge>
      </TableCell>
      <TableCell>
        {allCategories.find(({ name }) => name === transaction.category)
          ?.emoji +
          " " +
          transaction.category}
      </TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={() => onEdit(transaction)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(transaction.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
