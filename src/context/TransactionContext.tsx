import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Transaction } from "../types/transaction";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

interface TransactionContextType {
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
  updateTransaction: (
    id: string,
    updates: Partial<Omit<Transaction, "id" | "createdAt">>,
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const refreshTransactions = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "transactions"));

    const data = snapshot.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    })) as Transaction[];

    setTransactions(data);
  }, []);

  const updateTransaction = async (
    id: string,
    updates: Partial<Omit<Transaction, "id" | "createdAt">>,
  ) => {
    await updateDoc(doc(db, "transactions", id), updates);
    await refreshTransactions();
  };

  const deleteTransaction = async (id: string) => {
    await deleteDoc(doc(db, "transactions", id));
    await refreshTransactions();
  };

  useEffect(() => {
    refreshTransactions().catch(console.error);
  }, [refreshTransactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        refreshTransactions,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }

  return context;
}
