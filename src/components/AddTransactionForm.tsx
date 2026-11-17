import { CgAddR } from "react-icons/cg";
import type { TransactionType } from "../types/transaction";
import { MdOutlineCancel } from "react-icons/md";
import { useState, type FormEvent } from "react";

interface AddTransactionFormProps {
  monthYear: string;
  type: TransactionType;
}

function AddTransactionForm({ monthYear, type }: AddTransactionFormProps) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0.01);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const date = `01-${new Date(monthYear).getMonth().toString().padStart(2, "0")}-${new Date(monthYear).getFullYear()}`;
    console.log(date, type, amount, description);
  };

  return (
    <>
      <div
        className="h-px w-full bg-zento-gray rounded-full"
        hidden={!isFormOpen}
      />

      <form
        className="flex flex-col gap-4"
        hidden={!isFormOpen}
        onSubmit={handleSubmit}
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

        <div className="flex gap-2 font-bold">
          <button
            type="submit"
            className="w-full rounded-xl bg-zento-white text-zento-blue py-2 px-4 flex gap-2 items-center justify-center cursor-pointer"
          >
            <CgAddR />
            Save
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-zento-white py-2 px-4 flex gap-2 items-center justify-center-safe cursor-pointer"
            onClick={() => {
              setFormOpen(false);
              setDescription("");
              setAmount(0.01);
            }}
          >
            <MdOutlineCancel />
            Cancel
          </button>
        </div>
      </form>

      <button
        type="button"
        className="flex items-center justify-center bg-zento-white rounded-xl text-zento-blue font-bold text-base gap-2 py-2 px-4 cursor-pointer"
        onClick={() => setFormOpen(true)}
      >
        <CgAddR />
        Add Earning
      </button>
    </>
  );
}

export default AddTransactionForm;
