import { ShoppingCart, Trash, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartItemSkeleton from "./CartSkeleton";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  isLoading?: boolean;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  isLoading = false,
}: CartSidebarProps) {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-40 flex flex-col transition-transform duration-300 ease-in-out border-l border-gray-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 ">
          <h2 className="text-lg font-bold text-gray-800">Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoading ? (
            // Show skeletons when loading
            Array.from({ length: 3 }).map((_, index) => (
              <CartItemSkeleton key={index} />
            ))
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-4 flex gap-4 border border-gray-200"
              >
                {/* Product Image/Icon */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-3xl">📦</span>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-green-600 font-bold mt-1">
                      Rs. {item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 cursor-pointer bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold text-sm"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 cursor-pointer bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold text-sm"
                    >
                      +
                    </button>
                    <span className="ml-auto text-green-600 font-bold text-sm">
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-400 cursor-pointer hover:text-red-600 transition-colors text-sm self-start"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-start justify-between">
              {/* Center content */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
                <p className="text-gray-700 font-semibold">
                  Your cart is empty
                </p>
                <p className="text-gray-400 text-sm">
                  Add items to get started
                </p>
              </div>

              {/* Close button */}

              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-500 mb-6 font-medium transition-colors cursor-pointer"
              >
                <span className="absolute left-4 flex items-start justify-center w-8 h-8 bg-white rounded-md shadow-md text-green-600 font-bold text-lg">
                  &lt;
                </span>{" "}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">Rs. {totalPrice}</span>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-green-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-200 cursor-pointer text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
