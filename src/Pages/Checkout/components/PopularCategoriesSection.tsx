import { useNavigate } from "react-router-dom";
import CategoryCard from "../ui/CategoryCard";
import ProductCard from "../ui/ProductCards";
import { useCart } from "../../contexts/CartContext";

interface Category {
  name: string;
  images: string[];
  bgColor: string;
}

interface Product {
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

interface PopularCategoriesSectionProps {
  categories: Category[];
  products: Product[];
}

export default function PopularCategoriesSection({
  categories,
  products,
}: PopularCategoriesSectionProps) {
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Popular Categories</h2>
        <button className="text-green-600 text-sm font-medium hover:underline">
          See All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            {...category}
            onClick={() => navigate("/")}
            isActive={false}
          />
        ))}
      </div>

      {/* Products Below Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={(e) => handleAddToCart(product, e)}
            onClick={() => navigate("/")}
          />
        ))}
      </div>
    </div>
  );
}
