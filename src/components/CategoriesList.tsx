import type { Category } from "../types/category";

interface CategoriesListProps {
  categories: Category[];
}

function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div>
      <p>Body</p>
    </div>
  );
}

export default CategoriesList;
