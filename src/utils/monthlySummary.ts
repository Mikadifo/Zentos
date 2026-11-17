import type { Transaction, TransactionType } from "../types/transaction";

export interface MonthlySummary {
  monthYear: string;
  total: number;
  recentTransactions: Transaction[];
}

export function parseTransactionDate(dateString: string): Date {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function createMonthlySummary(
  transactions: Transaction[],
  type: TransactionType,
  year = new Date().getFullYear(),
) {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    const monthlyTransactions = transactions
      .filter((transaction) => {
        const date = parseTransactionDate(transaction.date);

        return (
          transaction.type === type &&
          date.getFullYear() === year &&
          date.getMonth() === monthIndex
        );
      })
      .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

    return {
      monthYear: new Date(year, monthIndex, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      type,
      total: monthlyTransactions.reduce(
        (total, transaction) => total + transaction.amount,
        0,
      ),
      recentTransactions: monthlyTransactions.slice(0, 3),
    };
  });
}
