import type { Transaction } from "../types/transaction";

interface TransactionCard {
  transaction: Transaction;
}

function TransactionCard({ transaction }: TransactionCard) {
  return (
    <div>
      {transaction.amount}
      test
    </div>
  );
}

export default TransactionCard;
