import TransactionList from "../components/TransactionList";
import type { Transaction } from "../types/transaction";
import earningsData from "./../data/earnings.json";

const earnings = earningsData as Transaction[];

function Earnings() {
  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">Earnings</h1>
      <h2 className="text-lg text-center mb-8">Track the money coming in</h2>

      <TransactionList transactions={earnings} />
    </div>
  );
}

export default Earnings;
