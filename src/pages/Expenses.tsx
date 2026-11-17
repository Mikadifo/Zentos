import { useParams } from "react-router-dom";
import SummaryList from "../components/SummaryList";
import type { Transaction } from "../types/transaction";
import { createMonthlySummary } from "../utils/monthlySummary";
import expensesData from "./../data/expenses.json";

function Expenses() {
  const { year } = useParams();
  const expenses = expensesData as Transaction[];
  const monthlySummary = createMonthlySummary(expenses, "expense", +year);

  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">Expenses {year}</h1>
      <h2 className="text-lg text-center mb-8">Track where your money go</h2>

      <SummaryList summaries={monthlySummary} />
    </div>
  );
}

export default Expenses;
