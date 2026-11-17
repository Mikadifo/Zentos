import type { Transaction, TransactionType } from "../types/transaction";
import { parseTransactionDate } from "./monthlySummary";

export function getAvailableYears(
  transactions: Transaction[],
  type: TransactionType,
) {
  return [
    ...new Set(
      transactions
        .filter((transaction) => transaction.type === type)
        .map(({ date }) => parseTransactionDate(date).getFullYear()),
    ),
  ].sort((a, b) => b - a);
}
