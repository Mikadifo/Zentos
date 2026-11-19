import { useParams } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import { useCategories } from "../context/CategoryContext";
import { createMonthlySummaryByCategory } from "../utils/monthlySummary";
import CategorySummaryList from "../components/CategorySummaryList";

function ExpensesDescription() {
  const { year, month } = useParams();
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const monthYear = new Date(Number(year), Number(month) - 1).toLocaleString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );

  const monthlyCategorySummary = createMonthlySummaryByCategory(
    transactions,
    categories,
    "expense",
    Number(year),
    Number(month),
  );

  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">{monthYear} Expenses</h1>
      <h2 className="text-lg text-center mb-8">Track where you money go</h2>

      <CategorySummaryList categorySummaries={monthlyCategorySummary} />
    </div>
  );
}

export default ExpensesDescription;
