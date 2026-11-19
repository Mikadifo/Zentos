import type { Category } from "../types/category";
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

export function createMonthlyBalanceSummary(
  transactions: Transaction[],
  year = new Date().getFullYear(),
) {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    const monthlyTransactions = transactions
      .filter((transaction) => {
        const date = parseTransactionDate(transaction.date);

        return date.getFullYear() === year && date.getMonth() === monthIndex;
      })
      .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

    const total = monthlyTransactions.reduce(
      (balance, transaction) =>
        transaction.type === "income"
          ? balance + transaction.amount
          : balance - transaction.amount,
      0,
    );

    return {
      monthYear: new Date(year, monthIndex, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      total,
      recentTransactions: monthlyTransactions.slice(0, 3),
    };
  });
}

export function createMonthlySummaryByCategory(
  transactions: Transaction[],
  categories: Category[],
  type: TransactionType,
  year: number,
  month: number,
) {
  const monthlyTransactions = transactions.filter((transaction) => {
    const date = parseTransactionDate(transaction.date);

    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      transaction.type === type
    );
  });

  return categories
    .map((category) => {
      const categoryTransactions = monthlyTransactions.filter(
        (transaction) => transaction.category.id === category.id,
      );

      return {
        categoryId: category.id,
        categoryName: category.name,
        type,
        total: categoryTransactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0,
        ),
        transactions: categoryTransactions,
      };
    })
    .filter((category) => category.transactions.length > 0)
    .sort((a, b) => b.total - a.total);
}
