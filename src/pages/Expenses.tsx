import { useParams } from "react-router-dom";
import SummaryList from "../components/SummaryList";
import type { Transaction } from "../types/transaction";
import { createMonthlySummary } from "../utils/monthlySummary";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

function Expenses() {
  const { year } = useParams();
  const [expenses, setEarnings] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEarnings() {
      try {
        setLoading(true);
        setError(null);

        const transactionsQuery = query(
          collection(db, "transactions"),
          where("type", "==", "expense"),
        );

        const snapshot = await getDocs(transactionsQuery);

        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Transaction[];

        setEarnings(data);
      } catch (err) {
        console.error("Error fetching expenses: ", err);
        setError("Unable to load expenses");
      } finally {
        setLoading(false);
      }
    }

    fetchEarnings();
  }, []);

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
