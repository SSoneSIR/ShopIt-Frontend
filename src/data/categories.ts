// Import category card images
import DailyGroceries from "../assets/ProductCategoryCards/DailyGroceries.png";
import TechAndAccessories from "../assets/ProductCategoryCards/TechAndAccessories.png";
import SnacksAndFastFood from "../assets/ProductCategoryCards/SnacksAndFastFood.png";
import LiqoursAndSmokes from "../assets/ProductCategoryCards/LiqoursAndSmokes.png";

export interface Category {
  name: string;
  images: string[];
  bgColor: string;
}

export const popularCategories: Category[] = [
  {
    name: "Daily Grocery's",
    images: [DailyGroceries],
    bgColor: "bg-emerald-400",
  },
  {
    name: "Technology & Accessories",
    images: [TechAndAccessories],
    bgColor: "bg-slate-200",
  },
  {
    name: "Snacks & FastFood",
    images: [SnacksAndFastFood],
    bgColor: "bg-amber-300",
  },
  {
    name: "Liquors & Smokes",
    images: [LiqoursAndSmokes],
    bgColor: "bg-orange-100",
  },
];

export const categoryTabs = [
  "All",
  "For You",
  "Flash Sale",
  "Popular",
  "Vegetables",
];

