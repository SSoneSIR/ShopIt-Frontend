import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Trash2, BadgePercent, RefreshCw } from "lucide-react";
import Header from "../../components/layout/Header";
import CategoryCard from "../../components/cards/CategoryCard";
import ProductCard from "../../components/cards/ProductCards";
import { useCart } from "../../contexts/CartContext";
import CheckoutItemSkeleton from "./components/CheckoutItemSkeleton";
import ProductCardSkeleton from "../../components/skeletons/ProductCardSkeleton";
import CategoryCardSkeleton from "../../components/skeletons/CategoryCardSkeleton";

// Import category card images
import DailyGroceries from "../../assets/ProductCategoryCards/dailygrocries.webp";
import TechAndAccessories from "../../assets/ProductCategoryCards/techand accessories.webp";
import SnacksAndFastFood from "../../assets/ProductCategoryCards/snacks and fastfood.webp";
import LiqoursAndSmokes from "../../assets/ProductCategoryCards/LiqoursAndSmokes.webp";

// Import product data
import { allProducts } from "../../data/products";

const popularCategories = [
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

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cartItems,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    cartCount,
  } = useCart();

  // Debugging - log cart items whenever they change
  React.useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  const [promoCode, setPromoCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mock user data - in real app, this would come from auth context
  const userName = "Your Name";
  const userPhone = "Your Mobile Number";
  const deliveryAddress = "Your Address";
  const estimatedArrival = "Your Estimated Arrival Time";

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 60;
  const baseDiscount = 20;
  const appliedDiscount = isCouponApplied ? baseDiscount : 0;
  const total = subtotal + deliveryCharge - appliedDiscount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "FREEUSE") {
      setIsCouponApplied(true);
    } else {
      setIsCouponApplied(false);
    }
  };

  const handlePlaceOrder = () => {
    // Navigate to order review page - CartContext data will be available there
    navigate("/order-review", {
      state: {
        discount: appliedDiscount,
        promoCode: isCouponApplied ? promoCode : null,
      },
    });
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.categoryCard === selectedCategory)
    : [];

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

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Delivery Information Section */}
        <div className="rounded-lg p-4 mb-6 max-w-2xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="text-center">
              {/* Back Button */}
              <div className="flex items-start justify-center gap-2 mb-3">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-500 font-medium transition-colors cursor-pointer mr-2"
                >
                  <span className="flex items-start justify-center w-8 h-8 bg-white rounded-md shadow-md text-green-600 font-bold text-lg hover:bg-gray-50">
                    &lt;
                  </span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-900 font-bold text-base">{userName}</p>
              <span className="font-normal text-sm text-gray-600">
                {userPhone}
              </span>
              <div className="flex items-start justify-center gap-2 mt-1">
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold">Home:</span> {deliveryAddress}
                </p>
                <button className="p-1.5 bg-green-600 rounded-full hover:bg-green-700 transition-colors flex-shrink-0 cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 border-2 border-dashed border-green-500 rounded-lg bg-green-50 w-fit mx-auto">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse-dot-1"></span>
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse-dot-2"></span>
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse-dot-3"></span>
              </div>
              <Truck className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium text-sm">
                Arrives in {estimatedArrival}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content: Cart Items and Checkout Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto items-start">
          {/* Left Column: Cart Items */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Cart Items</h2>
            <div className="space-y-2">
              {isLoading ? (
                // Show skeletons when loading
                Array.from({ length: 3 }).map((_, index) => (
                  <CheckoutItemSkeleton key={index} />
                ))
              ) : cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg p-3 flex gap-2 border-b border-gray-100 last:border-b-0 bg-white"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Product Image */}
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="text-xl">📦</span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-2">
                        {item.name}
                      </h3>
                      {item.weight && (
                        <p className="text-xs text-gray-600 mb-1">
                          {item.weight}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-900 font-bold text-sm">
                          Rs. {item.price}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-green-50 hover:bg-green-100 text-green-700 font-bold flex items-center justify-center transition-colors cursor-pointer text-sm"
                          >
                            −
                          </button>

                          <span className="px-3 py-0.5 bg-gray-100 rounded-2xl font-semibold text-gray-900 min-w-[2.5rem] text-center shadow-sm text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-green-50 hover:bg-green-100 text-green-700 font-bold flex items-center justify-center transition-colors cursor-pointer text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg p-8 text-center bg-white">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Checkout Summary */}
          <div className="lg:col-span-1 w-auto max-w-md mx-auto">
            <div className="border-l border-gray-300 p-5 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Amount</h2>

              {/* Promo Code Section */}
              <div className="mb-4 pb-3 border-b border-gray-300">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold cursor-pointer text-sm"
                  >
                    Apply
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <BadgePercent className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700 text-sm">
                  <span>Sub Total:</span>
                  <span className="font-semibold">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-sm">
                  <span>Delivery Charge:</span>
                  <span className="font-semibold">Rs. {deliveryCharge}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold">
                    <span>Discount:</span>
                    {isCouponApplied && (
                      <span className="text-[12px] text-green-600">
                        (Coupon Applied)
                      </span>
                    )}
                  </span>
                  <span
                    className={`font-semibold ${
                      isCouponApplied
                        ? "text-green-600"
                        : "text-red-500 line-through"
                    }`}
                  >
                    Rs. {baseDiscount}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-end">
                  <span className="text-base font-bold text-gray-900 mr-2">
                    Total:
                  </span>
                  <span className="text-base font-bold text-green-600">
                    Rs. {total}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-base cursor-pointer"
              >
                Place an Order
              </button>
            </div>
          </div>
        </div>

        {/* Popular Categories Section */}
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
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
