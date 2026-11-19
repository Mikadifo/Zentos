import { useCategories } from "../context/CategoryContext";
import type { Summary } from "../types/summary";
import AddTransactionForm from "./AddTransactionForm";

interface MonthlySummaryCardProps {
  summary: Summary;
}

function MonthlySummaryCard({ summary }: MonthlySummaryCardProps) {
  const { categories } = useCategories();

  return (
    <div className="rounded-xl border-2 border-zento-gray p-6 w-100 h-auto flex flex-col gap-8">
      <h3 className="font-bold text-2xl">{summary.monthYear}</h3>
      <div className="bg-zento-gray rounded-xl p-3 flex flex-col gap-2 text-end font-bold">
        <span className="uppercase text-xs">
          Total {summary.type === "income" ? "Earned" : "Spent"}
        </span>
        <span className="text-3xl">$ {summary.total.toFixed(2)}</span>
      </div>

      <div>
        <div className="font-bold flex justify-between items-center mb-4">
          <span className="text-lg">
            Recent {summary.type === "income" ? "Earnings" : "Expenses"}
          </span>
          <a href="#" className="text-zento-gray text-sm">
            View all
          </a>
        </div>

        <ul className="flex flex-col gap-4 text-base">
          {summary.recentTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center"
            >
              <div className="flex flex-col gap-2">
                <span>{transaction.description}</span>
                <span className="text-xs bg-zento-gray w-fit font-bold py-1 px-2 rounded-lg">
                  {
                    categories.find(
                      (category) => category.id === transaction.category.id,
                    ).name
                  }
                </span>
              </div>
              <span
                className={`${transaction.type === "income" ? "text-zento-green" : "text-zento-red"} font-bold`}
              >
                {transaction.type === "income" ? "+" : "-"}${" "}
                {transaction.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <AddTransactionForm monthYear={summary.monthYear} type={summary.type} />
    </div>
  );
}

export default MonthlySummaryCard;
