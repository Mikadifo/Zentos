import type { Transaction, TransactionType } from "./transaction";

export interface Summary {
  monthYear: string;
  type: TransactionType;
  total: number;
  recentTransactions: Transaction[];
}

export interface CategorySummary {
  categoryId: string;
  type: TransactionType;
  categoryName: string;
  total: number;
  transactions: Transaction[];
}
