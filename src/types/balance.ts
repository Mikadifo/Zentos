import type { Transaction } from "./transaction";

export interface Balance {
  monthYear: string;
  total: number;
  recentTransactions: Transaction[];
}
