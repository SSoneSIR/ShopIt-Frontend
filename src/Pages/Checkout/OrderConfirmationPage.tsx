import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import Header from "../../components/ui/Header";
import CategoryCard from "../../components/ui/CategoryCard";
import { useCart } from "../../contexts/CartContext";
import { popularCategories } from "../../data/categories";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, clearCart } = useCart();
  const order = location.state as {
    orderId?: string;
    total: number;
    paymentMethod?: string;
    cartItems?: any[];
    deliveryInstructions?: string;
  } | null;

  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
      return;
    }

    // Use the orderId from location state, or generate a new one if not provided
    if (order.orderId) {
      setOrderId(order.orderId);
    } else {
      // Generate a more user-friendly order ID
      const generateOrderId = () => {
        const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
        const random = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0"); // 4-digit padded random number
        return `ORD-${timestamp}-${random}`;
      };
      setOrderId(generateOrderId());
    }

    clearCart();
  }, [order, navigate, clearCart]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => {
            console.log("Back button clicked");
            window.location.href = "/";
          }}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-500 mb-6 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Order Confirmed!</span>
        </button>

        {/* Confirmation Card */}
        <div className="flex justify-center mb-12">
          <div className="max-w-md w-full  p-8 rounded-lg  text-center">
            <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center text-white text-4xl mb-6">
              ✓
            </div>

            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Your Order was Confirmed!
            </h2>

            <p className="text-gray-600 text-sm mb-6">Order ID: {orderId}</p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  window.location.href = "/track-order";
                }}
                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white py-3 rounded-full font-medium transition-colors"
              >
                Track Order
              </button>

              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="w-full bg-gray-800 hover:bg-gray-900 cursor-pointer text-white py-3 rounded-full flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <ShoppingBag size={18} />
                Shop More!
              </button>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Popular Categories
            </h2>
            <button
              onClick={() => {
                console.log("See All button clicked");
                window.location.href = "/";
              }}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              See All
            </button>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {popularCategories.map((category) => (
              <CategoryCard
                key={category.name}
                {...category}
                onClick={() => {
                  console.log("Category card clicked");
                  window.location.href = "/";
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
