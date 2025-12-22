import { X, Trash } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface CartToastProps {
  isVisible: boolean;
  itemName: string;
  itemImage: string;
  itemId: number;
  currentQuantity: number;
  quantityAdded: number;
  itemPrice: number;
  onViewCart: () => void;
  onClose: () => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartToast({
  isVisible,
  itemName,
  itemImage,
  itemId,
  currentQuantity,
  quantityAdded,
  itemPrice,
  onViewCart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}: CartToastProps) {
  const [previousQuantity, setPreviousQuantity] = useState(currentQuantity);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update previous quantity when current changes
  useEffect(() => {
    if (isVisible) {
      setPreviousQuantity(currentQuantity);
    }
  }, [currentQuantity, isVisible]);

  // Reset timer when quantity changes (user interaction)
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onClose();
    }, 5000);
  };

  // Auto-hide after 5 seconds, reset on interaction
  useEffect(() => {
    if (isVisible) {
      resetTimer();
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isVisible, onClose]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      onUpdateQuantity(itemId, newQuantity);
      resetTimer(); // Reset the auto-hide timer
    }
  };

  const handleDelete = () => {
    onRemoveItem(itemId);
    onClose(); // Close the toast after deleting
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className=" bg-white border rounded-3xl border-green-600 p-4 flex items-center gap-4 min-w-[400px] max-w-md">
        {/* Product Image */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img
            src={itemImage}
            alt={itemName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-gray-900">Added to cart</p>
          </div>
          <p className="text-xs text-gray-600 line-clamp-1 mb-1">{itemName}</p>
          <p className="text-sm font-bold text-green-600 mb-2">
            Rs. {itemPrice * currentQuantity}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(currentQuantity - 1)}
              disabled={currentQuantity <= 1}
              className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center transition-colors cursor-pointer text-lg"
            >
              −
            </button>
            <div className="px-4 py-1 bg-gray-100 rounded-lg font-semibold text-gray-900 text-sm min-w-[3rem] text-center">
              {currentQuantity}
            </div>
            <button
              onClick={() => handleQuantityChange(currentQuantity + 1)}
              className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer text-lg"
            >
              +
            </button>
            <button
              onClick={handleDelete}
              className="ml-2 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
              title="Remove from cart"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Cart Button */}
        <button
          onClick={onViewCart}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          Go to Cart
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
