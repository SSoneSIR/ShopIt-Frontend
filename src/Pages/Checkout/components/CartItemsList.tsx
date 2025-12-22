import { useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  weight?: string;
}

interface CartItemsListProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartItemsList({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemsListProps) {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Cart Items</h2>
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
