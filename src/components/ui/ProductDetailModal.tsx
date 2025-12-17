import { X, Star, Plus, Minus, ChevronLeft } from "lucide-react";
import { useState } from "react";

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  relatedProducts: Product[];
}

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  relatedProducts,
}: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Generate dynamic product description based on category
  const getProductDescription = () => {
    if (product.name.toLowerCase().includes("soup")) {
      return "2PM Noodles bring authentic Asian & Thai flavors with enthusiasm, love, fun ingredients. Packed with natural spices and nutrients, they're a quick, healthy, and delicious meal in minutes.";
    } else if (product.name.toLowerCase().includes("onion")) {
      return "Fresh, village-grown red onions with vibrant color and robust flavor. Perfect for cooking, salads, and adding depth to any dish. Carefully selected for quality and freshness.";
    } else if (product.name.toLowerCase().includes("peas")) {
      return "Fresh green peas in pods, sourced directly from local village farms. Sweet, tender, and packed with nutrients. Perfect for curries, rice dishes, and healthy side dishes.";
    } else if (product.name.toLowerCase().includes("cabbage")) {
      return "Crisp and fresh cabbage grown in local villages. Rich in vitamins and fiber, perfect for salads, stir-fries, and traditional dishes. Carefully harvested for maximum freshness.";
    } else if (
      product.name.toLowerCase().includes("spicy") ||
      product.name.toLowerCase().includes("sticks")
    ) {
      return "Crispy, spicy snack sticks that pack a flavorful punch. Perfect for snacking anytime, anywhere. Made with quality ingredients for that irresistible crunch and bold taste.";
    } else if (product.name.toLowerCase().includes("fan")) {
      return "Compact and efficient table fan designed for personal cooling. Quiet operation with adjustable speed settings. Perfect for your desk, bedside table, or any small space.";
    } else if (
      product.name.toLowerCase().includes("liquor") ||
      product.name.toLowerCase().includes("achari")
    ) {
      return "Premium quality product with authentic taste. Carefully crafted to meet the highest standards. Perfect for those who appreciate quality and tradition.";
    }
    return "High-quality product carefully selected for your satisfaction. Made with premium ingredients and attention to detail.";
  };

  // Generate dynamic product details
  const getProductDetails = () => {
    if (product.name.toLowerCase().includes("soup")) {
      return {
        "Net weight": "80gm",
        Calories: "400 cal/100gm",
        Fats: "20gm",
        Brand: "Asian Trail Foods",
      };
    } else if (product.name.toLowerCase().includes("onion")) {
      return {
        "Net weight": product.weight,
        Calories: "40 KCal/100gm",
        Fats: "0.1gm",
        Brand: "Fresh Farms",
      };
    } else if (product.name.toLowerCase().includes("peas")) {
      return {
        "Net weight": product.weight,
        Calories: "81 KCal/100gm",
        Fats: "0.4gm",
        Brand: "Village Fresh",
      };
    } else if (product.name.toLowerCase().includes("cabbage")) {
      return {
        "Net weight": product.weight,
        Calories: "25 KCal/100gm",
        Fats: "0.1gm",
        Brand: "Village Fresh",
      };
    } else if (product.name.toLowerCase().includes("fan")) {
      return {
        Power: "25W",
        Speed: "3 Levels",
        Warranty: "1 Year",
        Brand: "CoolBreeze",
      };
    } else if (
      product.name.toLowerCase().includes("spicy") ||
      product.name.toLowerCase().includes("current")
    ) {
      return {
        "Net weight": product.weight,
        Calories: "520 KCal/100gm",
        Fats: "28gm",
        Brand: "Current Snacks",
      };
    }
    return {
      "Net weight": product.weight,
      Brand: "Premium Brand",
    };
  };

  const details = getProductDetails();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center gap-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
        </div>

        <div className="p-6">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.rating})</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-green-600 font-medium">
                Delivered Today
              </span>
            </div>

            <div className="mb-4">
              {product.originalPrice && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
                    {product.discount || "SALE"}
                  </span>
                  <span className="text-gray-400 text-sm line-through">
                    Rs. {product.originalPrice}
                  </span>
                </div>
              )}
              <span className="text-3xl font-bold text-gray-900">
                Rs. {product.price}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                / {product.weight}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Plus className="w-5 h-5 text-white" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Description:
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {getProductDescription()}
            </p>
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Product Details:
            </h3>
            <div className="space-y-2">
              {Object.entries(details).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                More 2pm Noodles
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {relatedProducts.slice(0, 2).map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="h-24 flex items-center justify-center mb-3">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="h-full object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[40px]">
                      {relatedProduct.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{relatedProduct.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span>{relatedProduct.weight}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Rs. {relatedProduct.price}
                      </span>
                      <button className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                        <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 text-white py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
