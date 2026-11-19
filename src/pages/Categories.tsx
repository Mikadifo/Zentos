import CategoriesList from "../components/CategoriesList";
import { useCategories } from "../context/CategoryContext";

function Categories() {
  const { categories } = useCategories();

  return (
    <div className="p-8 text-zento-white">
      <h1 className="text-3xl font-bold text-center">Categories</h1>
      <h2 className="text-lg text-center mb-8">
        Manage transaction categories
      </h2>

      <CategoriesList categories={categories} />
    </div>
  );
}

export default Categories;
