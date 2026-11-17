import type { Transaction, TransactionType } from "./transaction";

export interface Summary {
  monthYear: string;
  type: TransactionType;
  total: number;
  recentTransactions: Transaction[];
}
