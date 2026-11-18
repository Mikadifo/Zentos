import { useParams } from "react-router-dom";
import SummaryList from "../components/SummaryList";
import { createMonthlySummary } from "../utils/monthlySummary";
import { useTransactions } from "../context/TransactionContext";

function Expenses() {
  const { year } = useParams();
  const { transactions } = useTransactions();

  const monthlySummary = createMonthlySummary(
    transactions,
    "expense",
    Number(year),
  );

  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">Expenses {year}</h1>
      <h2 className="text-lg text-center mb-8">Track where your money go</h2>

      <SummaryList summaries={monthlySummary} />
    </div>
  );
}

export default Expenses;
