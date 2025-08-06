import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getNTransactions } from "../../lib/transactionsUtils";

/**
 * Transactions Table component
 * @param {Array} transactions - The list of transactions to display
 * @param {Array} columns - Array of column configurations (label, accessor, render function)
 */
function TransactionsTable({ transactions, columns, maxRows = 5 }) {
  const limitedTransactions = maxRows
    ? getNTransactions(transactions, maxRows)
    : transactions;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.label}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {limitedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              {columns.map((col) => (
                <TableCell key={col.accessor}>
                  {col.render
                    ? col.render(transaction[col.accessor], transaction)
                    : transaction[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsTable;
