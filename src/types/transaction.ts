import type { DocumentReference, Timestamp } from "firebase/firestore";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  category: DocumentReference;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  createdAt: Timestamp;
}
