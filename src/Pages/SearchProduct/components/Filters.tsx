import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Truck, Tag } from "lucide-react";

interface FiltersProps {
  onFiltersChange?: (filters: any) => void;
}

export default function Filters({ onFiltersChange }: FiltersProps) {
  const [activeTab, setActiveTab] = useState<
    "sort" | "promotions" | "delivery"
  >("sort");
  const [sortBy, setSortBy] = useState("most-popular");
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 200, max: 1600 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [promotions, setPromotions] = useState({
    offers: false,
    freeDelivery: false,
  });
  const [deliveryType, setDeliveryType] = useState("fastest");

  const brands = [
    "Fresh Farm",
    "Organic Valley",
    "Green Gardens",
    "Nature's Best",
    "Farm Fresh",
    "Pure Harvest",
    "Garden Goods",
    "Natural Choice",
  ];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handlePromotionsChange = (key: keyof typeof promotions) => {
    setPromotions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full max-w-[95vw] sm:max-w-xs md:max-w-sm bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tab Headers */}
      <div className="flex flex-wrap">
        <button
          onClick={() => setActiveTab("sort")}
          className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-1 px-2 text-sm font-medium transition-colors ${
            activeTab === "sort" ? "  " : "text-gray-500 hover:text-gray-700"
          }`}
        ></button>
      </div>

      {/* Tab Content */}
      <div className="p-4 min-w-[200px] bg-white overflow-y-auto">
        {/* Sort By Tab */}
        {activeTab === "sort" && (
          <div className="space-y-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="most-popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="out-of-stock"
                checked={showOutOfStock}
                onChange={(e) => setShowOutOfStock(e.target.checked)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                htmlFor="out-of-stock"
                className="ml-2 text-sm text-gray-700"
              >
                Show Out Of Stock
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Rs. {priceRange.min}
                  </span>
                  <span className="text-sm text-gray-500">
                    Rs. {priceRange.max}
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1600"
                  value={priceRange.min}
                  onChange={(e) =>
                    handlePriceChange(parseInt(e.target.value), priceRange.max)
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
                />
                <input
                  type="range"
                  min="200"
                  max="1600"
                  value={priceRange.max}
                  onChange={(e) =>
                    handlePriceChange(priceRange.min, parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brands
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandToggle(brand)}
                    className={`w-full px-2 py-1.5 text-xs sm:text-sm rounded-full border transition-colors text-center truncate ${
                      selectedBrands.includes(brand)
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Promotions Tab */}
        {activeTab === "promotions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium text-gray-700">Offers</span>
              <button
                onClick={() => handlePromotionsChange("offers")}
                className={`relative ml-4 inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  promotions.offers ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    promotions.offers ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium text-gray-700">
                Free Delivery
              </span>
              <button
                onClick={() => handlePromotionsChange("freeDelivery")}
                className={`relative ml-4 inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  promotions.freeDelivery ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    promotions.freeDelivery ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Delivery Tab */}
        {activeTab === "delivery" && (
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Type
              </label>
              <div className="relative">
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="fastest">Fastest Delivery</option>
                  <option value="standard">Standard Delivery</option>
                  <option value="scheduled">Scheduled Delivery</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
