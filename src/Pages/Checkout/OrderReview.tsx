import { useState, useEffect } from "react";
import { Truck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import CategoryCard from "../../components/ui/CategoryCard";
import ProductCard from "../../components/ui/ProductCards";
import { popularCategories } from "../../data/categories";
import { useCart } from "../../contexts/CartContext";
import ProductCardSkeleton from "../../components/ui/ProductCardSkeleton";
import CategoryCardSkeleton from "../../components/ui/CategoryCardSkeleton";

// Import product data
import { allProducts } from "../../data/products";

import fonepay from "../../assets/PaymentTypes/fonepay.svg";
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight?: string;
}

interface LocationState {
  orderId?: string;
  cartItems?: CartItem[];
  subtotal?: number;
  deliveryCharge?: number;
  discount?: number;
  total?: number;
  cartCount?: number;
  paymentMethod?: string;
  deliveryInstructions?: string;
}

export default function OrderReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: contextCartItems, cartCount: contextCartCount } =
    useCart();

  // Get data from navigation state or use context as fallback
  const state = location.state as LocationState;
  const cartItems = state?.cartItems || contextCartItems;
  const cartCount = state?.cartCount || contextCartCount;

  // Calculate values if not provided
  const subtotal =
    state?.subtotal ||
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = state?.deliveryCharge || 60;
  // FIX: Use nullish coalescing (??) instead of logical OR (||)
  // This ensures that an explicit 0 discount is preserved
  const discount = state?.discount ?? 0;
  const total = state?.total || subtotal + deliveryCharge - discount;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to cart if no items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  // Mock user data - in real app, this would come from auth context
  const userName = "Your Name";
  const userPhone = "Your Mobile Number";
  const deliveryAddress = "Your Address";

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.categoryCard === selectedCategory)
    : [];

  const handleConfirmOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Generate a more user-friendly order ID
      const generateOrderId = () => {
        const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
        const random = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0"); // 4-digit padded random number
        return `ORD-${timestamp}-${random}`;
      };

      const orderId = generateOrderId();

      // Navigate to order confirmation page
      navigate("/order-confirmation", {
        state: {
          orderId,
          paymentMethod,
          total,
          cartItems,
          deliveryInstructions,
        },
      });

      setIsProcessing(false);
    }, 1000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        .animate-pulse-dot-1 {
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        .animate-pulse-dot-2 {
          animation: pulse-dot 1.5s ease-in-out 0.3s infinite;
        }
        .animate-pulse-dot-3 {
          animation: pulse-dot 1.5s ease-in-out 0.6s infinite;
        }
      `}</style>

      <Header cartCount={cartCount} />

      <div className="container mx-auto px-4 py-6 max-w-4xl border-b border-gray-300">
        {/* Header with back button */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow-md text-green-600 font-bold text-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              &lt;
            </button>
            <h2 className="text-sm font-bold text-gray-400">Place an Order</h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Shipping Information */}
          <div>
            <div className="rounded-lg border border-gray-100 bg-white p-4 text-sm space-y-3">
              <div className="border-b border-gray-200 bg-white p-4 text-sm space-y-3">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Shipping Information
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{userName}</p>
                  <p className="text-gray-600 text-xs">{userPhone}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {cartItems.length} item{cartItems.length !== 1 && "s"}
                </span>
              </div>

              <div className="text-gray-700 text-xs leading-relaxed">
                <span className="font-semibold">Shipping to: </span>
                {deliveryAddress}
              </div>

              {/* Delivery Instructions */}
              <div className="pt-2 border-t border-dashed border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Delivery Instructions (optional)
                </label>
                <textarea
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  rows={3}
                  placeholder="e.g. Leave at the gate or call on arrival"
                  className="w-full text-xs border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
                />
              </div>

              {/* Delivered Today pill */}
              <div className="flex items-center justify-center gap-2 px-3 py-1.5 border-2 border-dashed border-green-500 rounded-lg bg-green-50 w-full">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse-dot-1"></span>
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse-dot-2"></span>
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse-dot-3"></span>
                </div>
                <Truck className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium text-xs">
                  Delivered Today
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div className="border-l border-gray-300 pl-5 sticky top-24 space-y-4">
              <div className="w-full p-2 border border-gray-100 rounded-3xl bg-white pl-5 sticky top-24">
                <div className="border-b border-gray-300">
                  <h2 className="text-lg font-semibold text-gray-700 mb-3">
                    Amount
                  </h2>
                </div>
                {/* Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span>Sub Total:</span>
                    <span className="font-semibold">
                      Rs. {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span>Delivery Charge:</span>
                    <span className="font-semibold">
                      Rs. {deliveryCharge.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span>Discount:</span>
                    <span className="font-semibold text-red-600">
                      - Rs. {discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-end">
                    <span className="text-base font-bold text-green-600">
                      <span className="text-base font-bold text-gray-900">
                        Total:
                      </span>{" "}
                      Rs. {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6 pt-4 border border-gray-100 rounded-2xl bg-white sticky ">
                <div className="border-b border-gray-100 bg-white pl-5 sticky top-24">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Payment Method
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center gap-3 p-3 cursor-pointer  transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-green-600 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Cash on Delivery
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 cursor-pointer  transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="fonepay"
                      checked={paymentMethod === "fonepay"}
                      onChange={() => setPaymentMethod("fonepay")}
                      className="w-4 h-4 text-green-600 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <img
                        src={fonepay}
                        alt="Fonepay"
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3.5 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Confirm Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Popular Categories
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-green-600 text-sm font-medium hover:underline cursor-pointer"
            >
              {selectedCategory ? "Clear Selection" : "See All"}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <CategoryCardSkeleton key={index} />
                ))
              : popularCategories.map((category) => (
                  <CategoryCard
                    key={category.name}
                    {...category}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === category.name
                          ? null
                          : category.name
                      )
                    }
                    isActive={selectedCategory === category.name}
                  />
                ))}
          </div>
        </div>

        {/* Products Display Section */}
        {selectedCategory && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedCategory} Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                : filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={() => {
                        alert(
                          "Please complete your current order before adding new items"
                        );
                      }}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
