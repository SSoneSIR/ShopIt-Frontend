import PromoCodeSection from "./PromoCodeSection";
import OrderSummary from "./OrderSummary";

interface CheckoutSummaryProps {
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  cartItemsCount: number;
  onPlaceOrder: () => void;
}

export default function CheckoutSummary({
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  subtotal,
  deliveryCharge,
  discount,
  total,
  cartItemsCount,
  onPlaceOrder,
}: CheckoutSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Checkout Cart</h2>

        <PromoCodeSection
          promoCode={promoCode}
          onPromoCodeChange={onPromoCodeChange}
          onApply={onApplyPromo}
        />

        <OrderSummary
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          discount={discount}
          total={total}
        />

        <button
          onClick={onPlaceOrder}
          disabled={cartItemsCount === 0}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
        >
          Place an Order
        </button>
      </div>
    </div>
  );
}
