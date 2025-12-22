import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { allProducts } from "../../data/products";
import type { Product } from "../../data/products";
import ProductCard from "../../components/cards/ProductCards";
import ProductCardSkeleton from "../../components/skeletons/ProductCardSkeleton";
import {
  Filter,
  SlidersHorizontal,
  MapPin,
  Truck,
  Tag,
  ChevronDown,
  X,
} from "lucide-react";
import Filters from "./components/Filters";

export default function SearchProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(3);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  // Extract search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
  }, [location.search]);

  // Filter products based on search query
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const results = searchQuery.trim()
        ? allProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.categoryCard &&
                p.categoryCard
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()))
          )
        : [];
      setFilteredProducts(results);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product: Product) => {
    console.log(`Added product ${product.name} to cart`);
    setCartCount(cartCount + 1);
  };

  const handleFiltersChange = (filters: any) => {
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    setAppliedFilters({});
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        onCloseCart={() => setIsCartOpen(false)}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Search Results Header with Inline Filters */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Searching Results For:{" "}
              <span className="text-green-600">{searchQuery}</span>
            </h1>
            <p className="text-gray-600 mt-1">
              {isLoading
                ? "Loading..."
                : `${filteredProducts.length} products found`}
            </p>
          </div>

          {/* Inline Filter Buttons */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              {showFilters && (
                <div className="absolute right-0 top-full mt-1 w-64 z-50">
                  <Filters onFiltersChange={handleFiltersChange} />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowPromotions(!showPromotions)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <Tag className="w-4 h-4" />
                <ChevronDown className="w-4 h-4" />
              </button>
              {showPromotions && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Offers</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300 transition-colors focus:outline-none">
                        <span className="inline-block h-3 w-3 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Free Delivery
                      </span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300 transition-colors focus:outline-none">
                        <span className="inline-block h-3 w-3 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDelivery(!showDelivery)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <Truck className="w-4 h-4" />
                <ChevronDown className="w-4 h-4" />
              </button>
              {showDelivery && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Type
                    </label>
                    <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>Fastest Delivery</option>
                      <option>Standard Delivery</option>
                      <option>Scheduled Delivery</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Applied Filters Bar */}
        {Object.keys(appliedFilters).length > 0 && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium text-green-800">Filters:</span>
            {Object.entries(appliedFilters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {key}: {String(value)}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters[key];
                    setAppliedFilters(newFilters);
                  }}
                />
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="text-xs text-green-600 hover:text-green-800 font-medium ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => handleProductClick(product)}
                />
              ))}
        </div>

        {/* No Results Message */}
        {!isLoading && filteredProducts.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Tag className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any products matching "{searchQuery}"
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Browse All Products
            </button>
          </div>
        )}
      </main>
    </>
  );
}
