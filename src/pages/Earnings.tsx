import { useParams } from "react-router-dom";
import SummaryList from "../components/SummaryList";
import type { Transaction } from "../types/transaction";
import { createMonthlySummary } from "../utils/monthlySummary";
import earningsData from "./../data/earnings.json";

function Earnings() {
  const { year } = useParams();
  const earnings = earningsData as Transaction[];
  const monthlySummary = createMonthlySummary(earnings, "income", +year);

  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">Earnings {year}</h1>
      <h2 className="text-lg text-center mb-8">Track the money coming in</h2>

      <SummaryList summaries={monthlySummary} />
    </div>
  );
}

export default Earnings;
