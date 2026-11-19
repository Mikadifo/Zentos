import { useParams } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import { createMonthlyBalanceSummary } from "../utils/monthlySummary";
import BalanceList from "../components/BalanceList";

function Balances() {
  const { year } = useParams();
  const { transactions } = useTransactions();

  const monthlySummary = createMonthlyBalanceSummary(
    transactions,
    Number(year),
  );

  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">Balances {year}</h1>
      <h2 className="text-lg text-center mb-8">
        Check an estimated balance per month
      </h2>

      <BalanceList summaries={monthlySummary} />
    </div>
  );
}

export default Balances;
