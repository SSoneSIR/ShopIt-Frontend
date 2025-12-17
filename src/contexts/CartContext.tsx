import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  weight?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  handleAddToCart: (product: any, _event?: any) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
  handleRemoveItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (product: any, _event?: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setCartCount((prev) => prev + 1);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    const item = cartItems.find((i) => i.id === id);
    const diff = quantity - (item?.quantity || 0);
    setCartCount((prev) => prev + diff);
  };

  const handleRemoveItem = (id: number) => {
    const item = cartItems.find((i) => i.id === id);
    setCartCount((prev) => prev - (item?.quantity || 0));
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        setCartItems,
        setCartCount,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
