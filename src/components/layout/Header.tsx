import { useState, useRef, useEffect } from "react";
import Logo from "./header/Logo";
import CategoriesDropdown from "./header/CategoriesDropdown";
import SearchBar from "./header/SearchBar";
import LocationSelector from "./header/LocationSelector";
import CartButton from "./header/CartButton";
import LoginButton from "./header/LoginButton";
import { Menu, X, MapPin, Search, Star, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { allProducts } from "../../data/products";
import type { Product } from "../../data/products";
import CartToast from "../feedback/CartToast";

interface HeaderProps {
  cartCount: number;
  onCartClick?: () => void;
  onCloseCart?: () => void; // New prop to close cart
}

// ProductCard for search results (matching main page style)
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard = ({
  product,
  onAddToCart,
  onProductClick,
}: ProductCardProps) => {
  return (
    <div
      onClick={() => onProductClick(product)}
      className="rounded-3xl p-4 relative group hover:shadow-lg transition-shadow bg-white cursor-pointer"
    >
      {product.discount && (
        <span className="absolute top-0 left-0 bg-red-500 text-white text-sm px-4 py-2 rounded-tl-3xl rounded-br-3ql font-semibold z-10">
          {product.discount}
        </span>
      )}
      <div className="h-28 flex items-center justify-center mb-3 bg-white rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain"
          loading="lazy"
          width="100"
          height="100"
        />
      </div>
      <h4 className="text-foreground font-medium text-sm line-clamp-2 min-h-[40px]">
        {product.name}
      </h4>
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>
        <span>•</span>
        <span>{product.weight}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div>
          {product.originalPrice && (
            <span className="text-destructive text-xs line-through block">
              Rs. {product.originalPrice}
            </span>
          )}
          <span className="text-foreground font-bold">Rs. {product.price}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-8 h-8 bg-green-600 cursor-pointer hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

const categories = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Bakery & Bread",
  "Beverages",
  "Snacks & Sweets",
  "Frozen Foods",
  "Personal Care",
  "Household Items",
  "Baby Products",
];

export default function Header({
  cartCount = 3,
  onCartClick,
  onCloseCart,
}: HeaderProps) {
  const [selectedLocation, setSelectedLocation] = useState("Set Location here");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    return savedSearches
      ? JSON.parse(savedSearches)
      : ["Current Noodles", "Eggplant", "Wai Wai", "2pm Soupbase"];
  });
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleAddToCart: addToCart, cartItems } = useCart(); // Use cart context
  const [showToast, setShowToast] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string>("");
  const [lastAddedItemImage, setLastAddedItemImage] = useState<string>("");
  const lastCartItem = cartItems.find((item) => item.name === lastAddedItem);

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.categoryCard &&
            p.categoryCard.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const showProducts = filteredProducts.length > 0;

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearchFocus = () => {
    // Close the cart when search bar is focused
    if (onCloseCart) {
      onCloseCart();
    }
    setIsSearchFocused(true);
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchFocused(false);
    }
  };

  const handleSearchClose = () => {
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  const handleRemoveRecent = (search: string) => {
    const updatedSearches = recentSearches.filter((s) => s !== search);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.setItem("recentSearches", JSON.stringify([]));
  };

  const handleSearchClick = (search: string) => {
    setSearchQuery(search);
    if (!recentSearches.includes(search)) {
      const updatedSearches = [search, ...recentSearches].slice(0, 6);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
    // Only populate search bar, don't navigate
  };

  const handleAddToCart = (product: Product) => {
    // Use the cart context function to add to cart
    addToCart(product);
    // Show toast notification
    setLastAddedItem(product.name);
    setLastAddedItemImage(product.image);
    setShowToast(true);
    console.log(`Added product ${product.name} to cart`);
  };

  const handleProductClick = (product: Product) => {
    // Close the search bar when a product is clicked
    handleSearchClose();
    // Navigate to the product details page
    navigate(`/product/${product.id}`);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    // This would typically be handled by the cart context
    // For now, we'll just close the toast
    setShowToast(false);
  };

  const handleRemoveItem = (id: number) => {
    // This would typically be handled by the cart context
    // For now, we'll just close the toast
    setShowToast(false);
  };

  const trendingSearches = [
    "Tomatoes",
    "Basmati Rice",
    "Onions",
    "Current",
    "Wai Wai Noodles",
    "Wai Wai",
  ];

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchFocused &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the search bar itself
        const searchBar = document.querySelector(".search-bar-container");
        if (searchBar && !searchBar.contains(event.target as Node)) {
          handleSearchClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchFocused]);

  // Render search-only mode when focused (desktop only)
  if (isSearchFocused) {
    return (
      <>
        <header className="bg-white border-b border-gray-200 shadow-sm w-full sticky top-0 z-50 transition-all duration-300 ease-in-out transform scale-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center gap-2 w-full">
              <div className="flex-grow relative search-bar-container">
                <SearchBar
                  className="flex-grow transition-all duration-300 ease-in-out"
                  isFocused={true}
                  onFocus={handleSearchFocus}
                  onClose={handleSearchClose}
                  onSearchChange={setSearchQuery}
                  searchQuery={searchQuery}
                  onSubmit={handleSearchSubmit}
                />
              </div>
              <button
                onClick={handleSearchClose}
                className="text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer"
              >
                <X className="w-6 h-6 transition-transform duration-300 hover:scale-110" />
              </button>
            </div>
          </div>
        </header>
        {/* Search Results Area - overlaps content instead of pushing it down */}
        <div
          ref={searchResultsRef}
          className="fixed top-[70px] left-0 right-0 bg-gray-50 border-b border-gray-200 shadow-lg z-40 max-h-[70vh] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Results - Left Column */}
              <div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {showProducts ? (
                    filteredProducts
                      .slice(0, 3)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onProductClick={handleProductClick}
                        />
                      ))
                  ) : searchQuery ? (
                    <div className="py-8 text-center text-gray-500">
                      <p className="text-sm">
                        No products found for "{searchQuery}"
                      </p>
                      <p className="text-xs mt-1 text-gray-400">
                        Try searching with different keywords
                      </p>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      <p className="text-sm">
                        Start typing to search for products
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent and Trending Searches - Right Column */}
              <div>
                {/* Recent Searches */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Recent searches
                    </h3>
                    {recentSearches.length > 0 && (
                      <button
                        onClick={clearAllRecent}
                        className="text-xs text-gray-600 cursor-pointer font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {recentSearches.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search) => (
                        <div
                          key={search}
                          onClick={() => handleSearchClick(search)}
                          className="flex items-center cursor-pointer gap-2  rounded-full px-3 py-1.5 text-sm text-gray-700 bg-gray-200 cursor-pointer transition-colors"
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
                  ) : (
                    <p className="text-sm text-gray-500">No recent searches</p>
                  )}
                </div>

                {/* Trending Searches */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Trending searches
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleSearchClick(search)}
                        className="bg-gray-200 cursor-pointer rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CartToast
          isVisible={showToast}
          itemName={lastAddedItem}
          itemImage={lastAddedItemImage}
          itemId={lastCartItem?.id ?? 0}
          currentQuantity={lastCartItem?.quantity ?? 1}
          quantityAdded={1}
          itemPrice={lastCartItem?.price ?? 0}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onViewCart={() => {
            setShowToast(false);
            if (onCartClick) onCartClick();
          }}
          onClose={() => setShowToast(false)}
        />
      </>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm w-full sticky top-0 z-50 transition-all duration-300 ease-in-out transform scale-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 transition-all duration-300 ease-in-out">
          {/* Desktop Header (lg and above) */}
          <div className="hidden lg:flex flex-nowrap items-center gap-4">
            <div className="flex-shrink-0">
              <Logo onClick={handleLogoClick} className="h-8 w-24" />
            </div>

            <div className="flex-grow-[4]"></div>

            <CategoriesDropdown categories={categories} />

            <SearchBar
              className="flex-grow-2"
              isFocused={false}
              onFocus={handleSearchFocus}
              onClose={handleSearchClose}
              onSubmit={handleSearchSubmit}
            />

            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />

            <CartButton cartCount={cartCount} onClick={onCartClick} />

            <LoginButton />
          </div>

          {/* Tablet Header (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <div className="flex-shrink-0">
              <Logo className="h-12 w-auto" />
            </div>

            <SearchBar
              className="flex-grow"
              isFocused={false}
              onFocus={handleSearchFocus}
              onClose={handleSearchClose}
              onSubmit={handleSearchSubmit}
            />

            <div className="flex items-center gap-2">
              <CartButton cartCount={cartCount} onClick={onCartClick} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Header (below md) */}
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-2 mb-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700" />
                ) : (
                  <Menu className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700" />
                )}
              </button>

              <div className="flex-grow flex justify-center">
                <Logo className="h-8 w-auto" />
              </div>

              <div className="flex items-center gap-1">
                <CartButton cartCount={cartCount} onClick={onCartClick} />
                <LoginButton />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SearchBar
                className="flex-grow"
                isFocused={false}
                onFocus={handleSearchFocus}
                onClose={handleSearchClose}
                onSubmit={handleSearchSubmit}
              />
              <button className="p-2 hover:bg-gray-50 rounded-full transition-colors border border-gray-300 bg-white flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <CategoriesDropdown categories={categories} />
              </div>
            </div>
          )}
        </div>
      </header>
      <CartToast
        isVisible={showToast}
        itemName={lastAddedItem}
        itemImage={lastAddedItemImage}
        itemId={lastCartItem?.id ?? 0}
        currentQuantity={lastCartItem?.quantity ?? 1}
        quantityAdded={1}
        itemPrice={lastCartItem?.price ?? 0}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onViewCart={() => {
          setShowToast(false);
          if (onCartClick) onCartClick();
        }}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
