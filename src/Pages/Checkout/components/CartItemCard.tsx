import { Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  weight?: string;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 border-b border-gray-100 last:border-b-0">
      {/* Remove Button */}
      <button
        onClick={() => onRemoveItem(item.id)}
        className="text-red-400 hover:text-red-600 transition-colors self-start mt-1"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
        {item.weight && (
          <p className="text-sm text-gray-600 mb-2">{item.weight}</p>
        )}
        <p className="text-gray-900 font-bold text-base">Rs. {item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-700 font-bold flex items-center justify-center transition-colors"
          >
            −
          </button>
          <span className="px-4 py-1 bg-white border border-gray-200 rounded-lg font-semibold text-gray-900 min-w-[3rem] text-center shadow-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-700 font-bold flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
