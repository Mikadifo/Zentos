import type { Summary } from "../types/summary";
import { CgAddR } from "react-icons/cg";

interface MonthlySummaryCardProps {
  summary: Summary;
}

function MonthlySummaryCard({ summary }: MonthlySummaryCardProps) {
  return (
    <div className="rounded-xl border-2 border-zento-gray p-6 w-96.5 h-109.5 flex flex-col gap-8">
      <h3 className="font-bold text-2xl">{summary.monthYear}</h3>
      <div className="bg-zento-gray rounded-xl p-3 flex flex-col gap-2 text-end font-bold">
        <span className="uppercase text-xs">Total Spent</span>
        <span className="text-3xl">$ {summary.total}</span>
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

        <ul className="flex flex-col gap-3 text-base">
          {summary.recentTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center"
            >
              <span>{transaction.description}</span>
              <span className="text-zento-green font-bold">
                +$ {transaction.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="flex items-center justify-center bg-zento-white rounded-xl text-zento-blue font-bold text-base gap-2 py-2 px-4 cursor-pointer"
      >
        <CgAddR />
        Add Earning
      </button>
    </div>
  );
}

export default MonthlySummaryCard;
