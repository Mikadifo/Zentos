import type { CategorySummary } from "../types/summary";
import CategorySummaryCard from "./CategorySummaryCard";

interface CategorySummaryListProps {
  categorySummaries: CategorySummary[];
}

function CategorySummaryList({ categorySummaries }: CategorySummaryListProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {categorySummaries.map((summary) => (
        <CategorySummaryCard
          key={summary.categoryId}
          categorySummary={summary}
        />
      ))}
    </div>
  );
}

export default CategorySummaryList;
