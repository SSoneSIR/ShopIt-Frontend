import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../data/products"; // Import Product type

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
  handleAddToCart: (product: Product, _event?: any) => void; // Changed to accept Product
  handleUpdateQuantity: (id: number, quantity: number) => void;
  handleRemoveItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const recalculateCartCount = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      let updatedItems: CartItem[];

      if (existing) {
        updatedItems = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Convert Product to CartItem by extracting needed properties
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          weight: product.weight,
        };
        updatedItems = [...prev, cartItem];
      }

      setCartCount(recalculateCartCount(updatedItems));
      return updatedItems;
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) => {
      let updatedItems: CartItem[];

      if (quantity <= 0) {
        updatedItems = prev.filter((item) => item.id !== id);
      } else {
        updatedItems = prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }

      setCartCount(recalculateCartCount(updatedItems));
      return updatedItems;
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      setCartCount(recalculateCartCount(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export type { CartItem }; // Export CartItem type for use in other components
