import { atom } from "nanostores";
import { DateUtils } from "../lib/dateUtils";

const initialTransactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

export const transactionsStore = atom(initialTransactions);

export const setTransactions = (transactions) => {
  transactionsStore.set(transactions);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
  const currentTransactions = transactionsStore.get();
  const updatedTransactions = [...currentTransactions, transaction];
  setTransactions(updatedTransactions);
};

export const deleteTransaction = (id) => {
  const currentTransactions = transactionsStore.get();
  const updatedTransactions = currentTransactions.filter(
    (transaction) => transaction.id !== id
  );
  setTransactions(updatedTransactions);
};

export const updateTransaction = (id, updatedFields) => {
  const currentTransactions = transactionsStore.get();
  const updatedTransactions = currentTransactions.map((transaction) => {
    if (transaction.id === id) {
      return {
        ...transaction,
        ...updatedFields,
      };
    }
    return transaction;
  });
  setTransactions(updatedTransactions);
};

export const getTransactionById = (id) => {
  return (
    transactionsStore.get().find((transaction) => transaction.id === id) ?? {
      description: "",
      amount: "",
      type: "expense",
      category: "",
      date: DateUtils.toIso(new Date()),
    }
  );
};
