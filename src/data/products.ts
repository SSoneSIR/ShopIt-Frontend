// Import product images
import ChickenSoup from "../assets/Products/2pmChickenSoup.webp";
import CurrentSpicy from "../assets/Products/CurrentSpicy.webp";
import TablePort from "../assets/Products/TablePort.webp";
import ChickenSoupBox from "../assets/Products/ChickenBox.webp";
import RedOnion from "../assets/Products/RedOnion.webp";
import AchariSticks from "../assets/Products/CurrentAchariSticks.webp";
import GreenPeas from "../assets/Products/GreenPeas.webp";
import Cabbage from "../assets/Products/Cabbage.webp";

export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  weight: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  category: string;
  categoryCard: string;
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "2PM Classic Chicken Soup Base (Pouch)",
    image: ChickenSoup,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "For You",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 2,
    name: "Current Spicy Sticks (Snack Pack)",
    image: CurrentSpicy,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "Popular",
    categoryCard: "Snacks & FastFood",
  },
  {
    id: 3,
    name: "Table Fan ",
    image: TablePort,
    rating: 4.5,
    weight: "50g",
    price: 60,
    originalPrice: 80,
    discount: "20% Off",
    category: "Flash Sale",
    categoryCard: "Technology & Accessories",
  },
  {
    id: 4,
    name: "2PM Classic Chicken Soup Base (Box Pack)",
    image: ChickenSoupBox,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "For You",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 5,
    name: "Red Onion (Fresh Village Grown)",
    image: RedOnion,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "Vegetables",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 6,
    name: "Current Achari Sticks (Crispy 'N' Crunchy)",
    image: AchariSticks,
    rating: 4.5,
    weight: "50g",
    price: 80,
    category: "Popular",
    categoryCard: "Snacks & FastFood",
  },
  {
    id: 7,
    name: "Green Peas (Pods, fresh village grown)",
    image: GreenPeas,
    rating: 4.5,
    weight: "50g",
    price: 60,
    discount: "20% Off",
    category: "Flash Sale",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 8,
    name: "Cabbage (Fresh & Village Grown)",
    image: Cabbage,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "Vegetables",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 9,
    name: "2PM Classic Chicken Soup Base (Pouch)",
    image: ChickenSoup,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "For You",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 10,
    name: "Red Onion (Fresh Village Grown)",
    image: RedOnion,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "Vegetables",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 11,
    name: "Green Peas (Pods, fresh village grown)",
    image: GreenPeas,
    rating: 4.5,
    weight: "50g",
    price: 60,
    originalPrice: 80,
    category: "Popular",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 12,
    name: "Current Spicy Sticks (Snack Pack)",
    image: CurrentSpicy,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "Popular",
    categoryCard: "Snacks & FastFood",
  },
  {
    id: 13,
    name: "Table Fan ",
    image: TablePort,
    rating: 4.5,
    weight: "50g",
    price: 60,
    originalPrice: 80,
    discount: "20% Off",
    category: "Flash Sale",
    categoryCard: "Technology & Accessories",
  },
  {
    id: 14,
    name: "Red Onion (Fresh Village Grown)",
    image: RedOnion,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "Vegetables",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 15,
    name: "Green Peas (Pods, fresh village grown)",
    image: GreenPeas,
    rating: 4.5,
    weight: "50g",
    price: 60,
    originalPrice: 80,
    category: "Popular",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 16,
    name: "Red Onion (Fresh Village Grown)",
    image: RedOnion,
    rating: 4.5,
    weight: "50g",
    price: 60,
    discount: "20% Off",
    category: "Flash Sale",
    categoryCard: "Daily Grocery's",
  },
  {
    id: 17,
    name: "Current Spicy Sticks (Snack Pack)",
    image: CurrentSpicy,
    rating: 4.5,
    weight: "50g",
    price: 60,
    category: "Popular",
    categoryCard: "Snacks & FastFood",
  },
  {
    id: 18,
    name: "Liq 1",
    image: GreenPeas,
    rating: 4.5,
    weight: "50g",
    price: 60,
    originalPrice: 80,
    category: "Popular",
    categoryCard: "Liquors & Smokes",
  },
];

