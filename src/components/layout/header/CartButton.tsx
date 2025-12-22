import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  cartCount: number;
  onClick?: () => void;
  className?: string;
}

export default function CartButton({
  cartCount,
  onClick,
  className = "",
}: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 hover:bg-green-50 transition-colors flex-shrink-0 border rounded-full shadow-md bg-white border-gray-200 ${className}`}
    >
      <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
          {cartCount}
        </span>
      )}
    </button>
  );
}

