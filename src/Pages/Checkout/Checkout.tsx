import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Trash2, BadgePercent, RefreshCw } from "lucide-react";
import Header from "../../components/ui/Header";
import CategoryCard from "../../components/ui/CategoryCard";
import { useCart } from "../../contexts/CartContext";

// Import category card images
import DailyGroceries from "../../assets/ProductCategoryCards/DailyGroceries.png";
import TechAndAccessories from "../../assets/ProductCategoryCards/TechAndAccessories.png";
import SnacksAndFastFood from "../../assets/ProductCategoryCards/SnacksAndFastFood.png";
import LiqoursAndSmokes from "../../assets/ProductCategoryCards/LiqoursAndSmokes.png";

// Import product images
import ChickenSoup from "../../assets/Products/2pmChickenSoup.png";
import CurrentSpicy from "../../assets/Products/CurrentSpicy.png";
import TablePort from "../../assets/Products/TablePort.png";
import ChickenSoupBox from "../../assets/Products/ChickenBox.png";
import RedOnion from "../../assets/Products/RedOnion.png";
import AchariSticks from "../../assets/Products/CurrentAchariSticks.png";
import GreenPeas from "../../assets/Products/GreenPeas.png";
import Cabbage from "../../assets/Products/Cabbage.png";

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

const allProducts = [
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
];

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cartItems,
    handleUpdateQuantity,
    handleRemoveItem,
    cartCount,
    handleAddToCart,
  } = useCart();
  const [promoCode, setPromoCode] = useState("");

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
  const discount = 20;
  const total = subtotal + deliveryCharge - discount;

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen ">
      <Header cartCount={cartCount} />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Delivery Information Section */}
        <div className=" rounded-lg  p-6 mb-6 max-w-2xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-500 mb-2 font-medium transition-colors cursor-pointer"
              >
                <span className="flex items-start justify-center w-8 h-8 bg-white rounded-md shadow-md text-green-600 font-bold text-lg">
                  &lt;
                </span>
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-900 font-bold text-base">{userName}</p>
              <span className="font-normal">{userPhone}</span>
              <div className="flex items-start justify-center gap-2 mt-2">
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold">Home:</span> {deliveryAddress}
                </p>
                <button className="p-1.5 bg-green-600 rounded-full hover:bg-green-700 transition-colors flex-shrink-0">
                  <RefreshCw className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-dashed border-green-500 rounded-lg bg-green-50 w-fit mx-auto">
              <Truck className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium text-sm">
                Arrives in {estimatedArrival}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content: Cart Items and Checkout Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column: Cart Items */}
          <div className="">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cart Items</h2>
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className=" rounded-lg  p-4 flex gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors  cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    {/* Product Image */}
                    <div className="w-20 h-20  rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      {item.weight && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.weight}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-gray-900 font-bold text-base">
                          Rs. {item.price}
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-green-50 hover:bg-green-100 text-green-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
                          >
                            −
                          </button>

                          <span className="px-4 py-1  bg-gray-100  rounded-2xl font-semibold text-gray-900 min-w-[3rem] text-center shadow-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-green-50 hover:bg-green-100 text-green-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" rounded-lg  p-8 text-center">
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

          {/* Right Column: Checkout Cart */}
          <div className="lg:col-span-1 w-auto max-w-md mx-auto">
            <div className="border-l border-gray-300  p-6 sticky top-24 ">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Checkout Cart
              </h2>

              {/* Promo Code Section */}
              <div className="mb-6 border-b border-gray-300 ">
                <div className="flex items-center gap-2 mb-2 ">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold cursor-pointer">
                    Apply
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ">
                    <BadgePercent className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Sub Total:</span>
                  <span className="font-semibold">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charge:</span>
                  <span className="font-semibold">Rs. {deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span className="font-semibold">Rs. {discount}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-end">
                  <span className="text-lg font-bold text-gray-900 mr-2">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    Rs. {total}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full bg-green-600 text-white py-4 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg cursor-pointer  "
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
            <button className="text-green-600 text-sm font-medium hover:underline">
              See All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {popularCategories.map((category) => (
              <CategoryCard
                key={category.name}
                {...category}
                onClick={() => navigate("/")}
                isActive={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
