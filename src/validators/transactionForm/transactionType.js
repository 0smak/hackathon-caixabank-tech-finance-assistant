const { TRANSACTION_TYPE } = require("../../constants/transactionType");

export const validateTransactionType = (type) => {
  return type === TRANSACTION_TYPE.INCOME || type === TRANSACTION_TYPE.EXPENSE;
};
