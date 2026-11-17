import type { Summary } from "../types/summary";
import MonthlySummaryCard from "./MonthlySummaryCard";

interface SummaryListProps {
  summaries: Summary[];
}

function SummaryList({ summaries }: SummaryListProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {summaries.map((summary) => (
        <MonthlySummaryCard key={summary.monthYear} summary={summary} />
      ))}
    </div>
  );
}

export default SummaryList;
