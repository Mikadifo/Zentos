import { useState, type FormEvent } from "react";
import { useCategories } from "../context/CategoryContext";
import { CgAddR } from "react-icons/cg";

function AddCategoryForm() {
  const { addCategory } = useCategories();
  const [name, setName] = useState("");
  const [_, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    try {
      await addCategory({
        name: trimmedName,
      });
      setName("");
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Unable to add category");
    }
  };

  return (
    <div className="rounded-xl border-2 border-zento-gray p-6 w-100 h-auto flex flex-col gap-8">
      <h3 className="font-bold text-2xl">New Category</h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          value={name}
          required
          onChange={({ target }) => setName(target.value)}
          type="text"
          placeholder="Category name"
          className="border border-zento-white rounded-xl w-full py-2 px-4"
        />

        <div className="flex gap-2 font-bold">
          <button
            type="submit"
            className="w-full rounded-xl bg-zento-white text-zento-blue py-2 px-4 flex gap-2 items-center justify-center cursor-pointer"
          >
            <CgAddR />
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;
