import { Search, X, Star, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { allProducts } from "../../../data/products";
import type { Product } from "../../../data/products";

// Compact ProductCard for search results
interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative w-20 h-20 flex-shrink-0">
        {product.discount && (
          <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded z-10">
            {product.discount}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span>•</span>
          <span>{product.weight}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-red-500 text-xs line-through mr-2">
                Rs. {product.originalPrice}
              </span>
            )}
            <span className="text-gray-900 font-bold text-sm">
              Rs. {product.price}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-7 h-7 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface SearchBarProps {
  className?: string;
  onFocus?: () => void;
  onClose?: () => void;
  isFocused?: boolean;
}

export default function SearchBar({
  className = "",
  onFocus,
  onClose,
  isFocused,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Current Noodles",
    "Eggplant",
    "Wai Wai",
    "2pm Soupbase",
  ]);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingSearches = [
    "Tomatoes",
    "Basmati Rice",
    "Onions",
    "Current",
    "Wai Wai Noodles",
    "Wai Wai",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemoveRecent = (search: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== search));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  const handleSearchClick = (search: string) => {
    setSearchQuery(search);
    if (!recentSearches.includes(search)) {
      setRecentSearches([search, ...recentSearches].slice(0, 6));
    }
  };

  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
  };

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.categoryCard &&
            p.categoryCard.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allProducts;

  const showProducts = filteredProducts.length > 0;

  return (
    <>
      {/* Overlay when search is open (only show when not in header search mode) */}
      {isOpen && !isFocused && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out opacity-100"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Search Container */}
      <div
        ref={searchRef}
        className={`${
          isOpen && !isFocused ? "fixed top-4 left-4 right-4 z-50" : "relative"
        } ${className}`}
      >
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
          <input
            type="text"
            placeholder="Search for Products...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsOpen(true);
              if (onFocus) onFocus();
            }}
            autoFocus={isFocused}
            className={`w-full bg-gray-50 border rounded-full py-3 pl-12 pr-12 text-sm focus:outline-none transition-all duration-300 ease-in-out ${
              isFocused
                ? "border-green-500 focus:border-green-500 shadow-lg"
                : "border-gray-200 focus:border-gray-300 focus:bg-white"
            }`}
          />
        </div>

        {/* Dropdown (only show when not in header search mode) */}
        {isOpen && !isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-[calc(100vh-120px)] overflow-y-auto transition-all duration-300 ease-in-out transform opacity-100 translate-y-0">
            {/* Search Results */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Search Results
                </h3>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              {showProducts ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p className="text-sm">
                    No products found for "{searchQuery}"
                  </p>
                  <p className="text-xs mt-1 text-gray-400">
                    Try searching with different keywords
                  </p>
                </div>
              )}
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Recent searches
                  </h3>
                  <button
                    onClick={clearAllRecent}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <div
                      key={search}
                      onClick={() => handleSearchClick(search)}
                      className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      <span>{search}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveRecent(search);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="px-4 pb-4 border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Trending searches
                </h3>
                <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearchClick(search)}
                    className="bg-gray-100 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
