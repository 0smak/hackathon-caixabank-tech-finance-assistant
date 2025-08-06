import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import AreaGraph from "./AreaGraph";
import { memo } from "react";

function BalanceOverTime() {
  const transactions = useStore(transactionsStore);
  return <AreaGraph data={transactions} />;
}

export default memo(BalanceOverTime);
