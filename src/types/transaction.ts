import type { Timestamp } from "firebase/firestore";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  createdAt: Timestamp;
}
