// Import category card images
import DailyGroceries from "/assets/ProductCategoryCards/dailygrocries.webp";
import TechAndAccessories from "/assets/ProductCategoryCards/techand accessories.webp";
import SnacksAndFastFood from "/assets/ProductCategoryCards/snacks and fastfood.webp";
import LiqoursAndSmokes from "/assets/ProductCategoryCards/LiqoursAndSmokes.webp";

export interface Category {
  name: string;
  images: string[];
  bgColor: string;
}

export const popularCategories: Category[] = [
  {
    name: "Daily Grocery's",
    images: [DailyGroceries],
    bgColor: "bg-emerald-100",
  },
  {
    name: "Technology & Accessories",
    images: [TechAndAccessories],
    bgColor: "bg-gray-200",
  },
  {
    name: "Snacks & FastFood",
    images: [SnacksAndFastFood],
    bgColor: "bg-orange-100",
  },
  {
    name: "Liquors & Smokes",
    images: [LiqoursAndSmokes],
    bgColor: "bg-pink-100",
  },
];

export const categoryTabs = [
  "All",
  "For You",
  "Flash Sale",
  "Popular",
  "Vegetables",
];

