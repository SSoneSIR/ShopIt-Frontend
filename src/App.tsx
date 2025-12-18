import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import CheckoutPage from "./Pages/Checkout/Checkout";
import HomePage from "./Pages/Home/Home";
import ProductDetailsPage from "./Pages/ProductDetails/ProductDetails";
import { CartProvider } from "./contexts/CartContext";
import OrderConfirmation from "./Pages/Checkout/OrderConfirmationPage";
import OrderReview from "./Pages/Checkout/OrderReview";

// Main Index Component
const Index = () => {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-gray-50">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-review" element={<OrderReview />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
};

export default Index;
