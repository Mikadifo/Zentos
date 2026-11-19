import type { Balance } from "../types/balance";
import MonthlyBalanceCard from "./MonthlyBalanceCard";

interface BalanceListProps {
  summaries: Balance[];
}

function BalanceList({ summaries }: BalanceListProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {summaries.map((summary) => (
        <MonthlyBalanceCard key={summary.monthYear} summary={summary} />
      ))}
    </div>
  );
}

export default BalanceList;
