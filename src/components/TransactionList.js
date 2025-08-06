import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStore } from "@nanostores/react";
import { useCallback, useMemo, useState } from "react";
import {
  deleteTransaction as deleteTransactionFromStore,
  transactionsStore,
} from "../stores/transactionStore";
import NoTransactions from "./NoTransactions";
import TitleH3 from "./TitleH3";
import TransactionForm from "./TransactionForm";
import ListFilters from "./TransactionList/ListFilters";
import ListPagination from "./TransactionList/ListPagination";
import TransactionRow from "./TransactionList/TransactionRow";

function TransactionList() {
  const transactions = useStore(transactionsStore);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Implement delete functionality
  // Instructions:
  // - Implement the logic to delete a transaction by its ID.
  // - Make sure the transactions state/store is updated after deletion.
  const deleteTransaction = useCallback((id) => {
    deleteTransactionFromStore(id);
  }, []);

  const handleEdit = useCallback((transaction) => {
    setEditTransactionId(transaction.id);
    setShowAddTransaction(true);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const matchesCategory = filterCategory
          ? transaction.category === filterCategory
          : true;
        const matchesType = filterType ? transaction.type === filterType : true;
        return matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (sortField === "amount") {
          return b.amount - a.amount;
        } else if (sortField === "date") {
          return new Date(b.date) - new Date(a.date);
        }
        return 0;
      });
  }, [transactions, filterCategory, filterType, sortField]);

  const paginatedTransactions = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredTransactions.slice(start, start + rowsPerPage);
  }, [filteredTransactions, page, rowsPerPage]);

  return (
    <>
      {showAddTransaction && (
        <TransactionForm
          transactionToEdit={editTransactionId}
          onClose={() => setShowAddTransaction(false)}
        />
      )}
      <Box sx={{ mt: 4, px: { xs: 0, md: 4 } }}>
        <TitleH3>Transaction List</TitleH3>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditTransactionId("");
              setShowAddTransaction(true);
            }}
          >
            Add Transaction
          </Button>
          <ListFilters
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterType={filterType}
            setFilterType={setFilterType}
            sortField={sortField}
            setSortField={setSortField}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount (€)</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={deleteTransaction}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!paginatedTransactions.length && (
          <Box sx={{ my: 4 }}>
            <NoTransactions>No transactions available.</NoTransactions>
          </Box>
        )}

        <ListPagination
          count={filteredTransactions.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </>
  );
}

export default TransactionList;
