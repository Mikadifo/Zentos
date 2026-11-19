import type { Balance } from "../types/balance";

interface MonthlyBalanceCardProps {
  summary: Balance;
}

function MonthlyBalanceCard({ summary }: MonthlyBalanceCardProps) {
  return (
    <div className="rounded-xl border-2 border-zento-gray p-6 w-100 h-auto flex flex-col gap-8">
      <h3 className="font-bold text-2xl">{summary.monthYear}</h3>
      <div className="bg-zento-gray rounded-xl p-3 flex flex-col gap-2 text-end font-bold">
        <span className="uppercase text-xs">Estimated Balance</span>
        <span
          className={`text-3xl ${Number(summary.total.toFixed(2)) < 0 ? "text-zento-red" : "text-zento-white"}`}
        >
          $ {summary.total.toFixed(2)}
        </span>
      </div>

      <div>
        <div className="font-bold flex justify-between items-center mb-4">
          <span className="text-lg">Recent Transactions</span>
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
    </div>
  );
}

export default MonthlyBalanceCard;
