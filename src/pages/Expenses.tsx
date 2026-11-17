import TransactionList from "../components/TransactionList";
import type { Transaction } from "../types/transaction";
import expensesData from "./../data/expenses.json";

const expenses = expensesData as Transaction[];

function Expenses() {
  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">Expenses</h1>
      <h2 className="text-lg text-center mb-8">Track where your money go</h2>

      <TransactionList transactions={expenses} />
    </div>
  );
}

export default Expenses;
