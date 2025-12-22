import { BadgePercent } from "lucide-react";

interface PromoCodeSectionProps {
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onApply: () => void;
}

export default function PromoCodeSection({
  promoCode,
  onPromoCodeChange,
  onApply,
}: PromoCodeSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => onPromoCodeChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
        <button
          onClick={onApply}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Apply
        </button>
        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <BadgePercent className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
