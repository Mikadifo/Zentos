import { useState, type FormEvent } from "react";
import { useCategories } from "../context/CategoryContext";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import type { Category } from "../types/category";

interface EditCategoryFormProps {
  category: Category;
}

function EditCategoryForm({ category }: EditCategoryFormProps) {
  const { updateCategory, deleteCategory } = useCategories();
  const [isFormOpen, setFormOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [_, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = newName.trim();

    if (!trimmedName) return;

    try {
      await updateCategory(category.id, {
        name: trimmedName,
      });
      setFormOpen(false);
      setNewName("");
    } catch (error) {
      console.error("Error updating category:", error);
      setError("Unable to update category");
    }
  };

  const handleDelete = async () => {
    const deleteConfirmation = confirm(
      `Are you sure you want to delete this category: ${category.name}?`,
    );

    if (!deleteConfirmation) return;

    try {
      await deleteCategory(category.id);
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Unable to delete category");
    }
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
          value={newName}
          required
          onChange={({ target }) => setNewName(target.value)}
          type="text"
          placeholder="New name"
          className="border border-zento-white rounded-xl w-full py-2 px-4"
        />

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
              setFormOpen(false);
              setNewName("");
            }}
          >
            <MdOutlineCancel />
            Close
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4" hidden={isFormOpen}>
        <button
          type="button"
          className="flex items-center justify-center bg-zento-white rounded-xl text-zento-blue font-bold text-base gap-2 py-2 px-4 cursor-pointer"
          onClick={() => setFormOpen(true)}
        >
          <AiFillEdit />
          Update Name
        </button>

        <button
          type="button"
          className="flex items-center justify-center rounded-xl font-bold text-base gap-2 py-2 px-4 cursor-pointer border border-zento-white"
          onClick={handleDelete}
        >
          <AiFillDelete />
          Delete
        </button>
      </div>
    </>
  );
}

export default EditCategoryForm;
