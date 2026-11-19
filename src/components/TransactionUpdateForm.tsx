import { MdOutlineCancel } from "react-icons/md";
import type { Transaction } from "../types/transaction";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { useTransactions } from "../context/TransactionContext";
import { useCategories } from "../context/CategoryContext";
import { BiSolidDownArrow } from "react-icons/bi";
import { doc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface TransactionUpdateFormProps {
  transaction: Transaction;
  setSelectedTransaction: Dispatch<SetStateAction<Transaction | null>>;
}

function TransactionUpdateForm({
  transaction,
  setSelectedTransaction,
}: TransactionUpdateFormProps) {
  const { updateTransaction, deleteTransaction } = useTransactions();
  const { categories } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [categoryId, setCategoryId] = useState(transaction.category.id);
  const [_, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateTransaction(transaction.id, {
        description,
        amount,
        category: doc(db, "categories", categoryId),
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error updating transaction:", error);
      setError("Unable to update transaction");
    }
  };

  const handleDelete = async () => {
    const deleteConfirmation = confirm(
      `Are you sure you want to delete this transaction: ${transaction.description} ?`,
    );

    if (!deleteConfirmation) return;

    try {
      await deleteTransaction(transaction.id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Unable to delete transaction");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-3">
          <button
            type="button"
            className="font-bold text-sm flex items-center gap-1 cursor-pointer hover:opacity-80"
            onClick={() => {
              setShowForm(true);
              setDescription(transaction.description);
              setAmount(transaction.amount);
              setCategoryId(transaction.category.id);
            }}
          >
            <AiFillEdit />
            Update
          </button>
          <button
            type="button"
            className="font-bold text-sm flex items-center gap-1 text-zento-red cursor-pointer hover:opacity-80"
            onClick={handleDelete}
          >
            <AiFillDelete />
            Delete
          </button>
        </div>

        <button
          type="button"
          className="font-bold text-sm flex items-center gap-1 text-zento-gray cursor-pointer hover:opacity-80"
          onClick={() => setSelectedTransaction(null)}
        >
          <MdOutlineCancel />
          Cancel
        </button>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        hidden={!showForm}
      >
        <input
          value={description}
          required
          onChange={({ target }) => setDescription(target.value)}
          type="text"
          placeholder="Description"
          className="border border-zento-white rounded-xl w-full py-2 px-4"
        />
        <input
          required
          value={amount}
          onChange={({ target }) => setAmount(+target.value)}
          type="number"
          min={0.01}
          step="0.01"
          placeholder="0.00"
          className="border border-zento-white rounded-xl w-full py-2 px-4"
        />
        <div className="relative">
          <select
            id="category"
            name="category"
            required
            onChange={({ target }) => setCategoryId(target.value)}
            className="appearance-none border border-zento-white rounded-xl w-full py-2 px-4 pr-10 text-zento-white"
          >
            <option
              value=""
              disabled
              selected={!categoryId}
              className="bg-zento-blue"
            >
              Select a category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                defaultValue={category.id === categoryId ? categoryId : null}
                className="bg-zento-blue"
              >
                {category.name}
              </option>
            ))}
          </select>
          <BiSolidDownArrow className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zento-white" />
        </div>

        <div className="flex gap-2 font-bold">
          <button
            type="submit"
            className="w-full rounded-xl bg-zento-white text-zento-blue py-2 px-4 flex gap-2 items-center justify-center cursor-pointer"
          >
            <AiFillEdit />
            Save
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-zento-white py-2 px-4 flex gap-2 items-center justify-center-safe cursor-pointer"
            onClick={() => {
              setShowForm(false);
              setDescription(transaction.description);
              setAmount(transaction.amount);
              setCategoryId(transaction.category.id);
            }}
          >
            <MdOutlineCancel />
            Close
          </button>
        </div>
      </form>

      <div
        className="h-px w-full bg-zento-gray rounded-full"
        hidden={!showForm}
      />
    </div>
  );
}

export default TransactionUpdateForm;
