import { useStore } from "@nanostores/react";
import { format } from "date-fns";
import { TRANSACTION_TYPE } from "../constants/transactionType";
import { getEmojiByCategoryName } from "../lib/getEmojiByCategory";
import { sortTransactions } from "../lib/transactionsUtils";
import { transactionsStore } from "../stores/transactionStore";
import Badge from "./Badge";
import NoTransactions from "./NoTransactions";
import TransactionsTable from "./TransactionTable";
function RecentTransactions() {
  const transactions = useStore(transactionsStore);
  const recentTransactions = sortTransactions(transactions);
  const columns = [
    {
      label: "Description",
      accessor: "description",
      render: (value) => <strong>{value}</strong>,
    },
    {
      label: "Amount (€)",
      accessor: "amount",
      render: (value) => {
        return new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(value);
      },
    },
    {
      label: "Type",
      accessor: "type",
      render: (value) => (
        <Badge type={value === TRANSACTION_TYPE.INCOME ? "success" : "error"}>
          {value}
        </Badge>
      ),
    },
    {
      label: "Category",
      accessor: "category",
      render: (value) => getEmojiByCategoryName(value) + "  " + value,
    },
    {
      label: "Date",
      accessor: "date",
      render: (value) => format(new Date(value), "dd/MM/yyyy"),
    },
  ];

  return (
    <div>
      <h3>Recent Transactions</h3>
      {!!transactions.length ? (
        <TransactionsTable
          transactions={recentTransactions}
          columns={columns}
          maxRows={5}
        />
      ) : (
        <NoTransactions>No recent transactions available.</NoTransactions>
      )}
    </div>
  );
}

export default RecentTransactions;
