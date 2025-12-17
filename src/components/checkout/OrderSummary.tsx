interface OrderSummaryProps {
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
}

export default function OrderSummary({
  subtotal,
  deliveryCharge,
  discount,
  total,
}: OrderSummaryProps) {
  return (
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
      <div className="border-t border-gray-200 pt-3 flex justify-between">
        <span className="text-lg font-bold text-gray-900">Total:</span>
        <span className="text-lg font-bold text-green-600">Rs. {total}</span>
      </div>
    </div>
  );
}
