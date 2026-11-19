import type { Category } from "../types/category";
import CategoryCard from "./CategoryCard";

interface CategoriesListProps {
  categories: Category[];
}

function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoriesList;
