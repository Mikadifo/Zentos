import type { Category } from "../types/category";
import EditCategoryForm from "./EditCategoryForm";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="rounded-xl border-2 border-zento-gray p-6 w-100 h-auto flex flex-col gap-8">
      <h3 className="font-bold text-2xl">{category.name}</h3>

      <EditCategoryForm category={category} />
    </div>
  );
}

export default CategoryCard;
