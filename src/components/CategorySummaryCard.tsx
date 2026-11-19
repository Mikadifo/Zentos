import { useState } from "react";
import type { CategorySummary } from "../types/summary";
import TransactionUpdateForm from "./TransactionUpdateForm";
import type { Transaction } from "../types/transaction";

interface CategorySummaryCardProps {
  categorySummary: CategorySummary;
}

function CategorySummaryCard({ categorySummary }: CategorySummaryCardProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  return (
    <div className="rounded-xl border-2 border-zento-gray p-6 w-100 h-auto flex flex-col gap-8">
      <h3 className="font-bold text-2xl">{categorySummary.categoryName}</h3>
      <div className="bg-zento-gray rounded-xl p-3 flex flex-col gap-2 text-end font-bold">
        <span className="uppercase text-xs">
          Total {categorySummary.type === "income" ? "Earned" : "Spent"}
        </span>
        <span
          className={`text-3xl ${Number(categorySummary.total.toFixed(2)) < 0 ? "text-zento-red" : "text-zento-white"}`}
        >
          $ {categorySummary.total.toFixed(2)}
        </span>
      </div>

      <ul className="flex flex-col gap-4 text-base">
        {categorySummary.transactions.map((transaction) => (
          <li key={transaction.id}>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className={`${selectedTransaction !== null && selectedTransaction.id === transaction.id ? "underline font-bold" : ""} cursor-pointer hover:opacity-80`}
                onClick={() => setSelectedTransaction(transaction)}
              >
                {transaction.description}
              </button>
              <span
                className={`${transaction.type === "income" ? "text-zento-green" : "text-zento-red"} font-bold`}
              >
                {transaction.type === "income" ? "+" : "-"}${" "}
                {transaction.amount}
              </span>
            </div>

            <div
              className="mt-1"
              hidden={
                selectedTransaction === null ||
                selectedTransaction.id !== transaction.id
              }
            >
              <TransactionUpdateForm
                transaction={transaction}
                setSelectedTransaction={setSelectedTransaction}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySummaryCard;
