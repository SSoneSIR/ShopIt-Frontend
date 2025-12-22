import { Zap, Heart, TrendingUp, Leaf, LayoutGrid } from "lucide-react";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "All":
      return <LayoutGrid className=" w-4 h-4" />;
    case "Flash Sale":
      return <Zap className="w-4 h-4 fill-current" />;
    case "For You":
      return <Heart className="w-4 h-4" />;
    case "Popular":
      return <TrendingUp className="w-4 h-4" />;
    case "Vegetables":
      return <Leaf className="w-4 h-4" />;
    default:
      return null;
  }
};

const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`flex items-center border border-white bg-white shadow-sm cursor-pointer gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            activeCategory === category
              ? "bg-yellow-100 text-foreground shadow-md scale-105"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-102"
          }`}
        >
          {getCategoryIcon(category)}
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
