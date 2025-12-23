import { useState, useRef, useEffect } from "react";
import Logo from "./header/Logo";
import CategoriesDropdown from "./header/CategoriesDropdown";
import SearchBar from "./header/SearchBar";
import LocationSelector from "./header/LocationSelector";
import CartButton from "./header/CartButton";
import LoginButton from "./header/LoginButton";
import {
  Menu,
  X,
  MapPin,
  Search,
  Star,
  Plus,
  LogIn,
  ShoppingCart,
} from "lucide-react";
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

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const menuButton = document.querySelector(".mobile-menu-button");
        const menuDropdown = document.querySelector(".mobile-menu-dropdown");

        if (
          menuButton &&
          !menuButton.contains(event.target as Node) &&
          menuDropdown &&
          !menuDropdown.contains(event.target as Node)
        ) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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

          {/* Mobile Header (below md) - Single Row */}
          <div className="md:hidden flex items-center gap-2">
            {/* Logo on Far Left */}
            <div className="flex-shrink-0">
              <Logo
                onClick={handleLogoClick}
                className="h-7 w-auto cursor-pointer"
              />
            </div>

            <div className="flex-grow"></div>
            <button
              onClick={() => {
                handleSearchFocus();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700" />
              <span className="text-gray-800 font-medium"></span>
            </button>
            {/* Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors mobile-menu-button"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ease-in-out border-l border-gray-200 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Cart */}
          <button
            onClick={() => {
              if (onCartClick) onCartClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <span className="text-gray-800 font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="ml-auto bg-green-600 text-white text-xs rounded-full px-2 py-1 font-medium">
                {cartCount}
              </span>
            )}
          </button>

          {/* Login */}
          <button
            onClick={() => {
              navigate("/login");
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <LogIn className="w-5 h-5 text-gray-700" />
            <span className="text-gray-800 font-medium">Login</span>
          </button>

          {/* Location */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center gap-3 p-3 rounded-lg">
              <div className="flex-1">
                <LocationSelector
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="border-t border-gray-200 pt-3">
            <p className="text-xs text-gray-500 px-3 mb-2">Categories</p>
            <CategoriesDropdown categories={categories} />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        />
      )}

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
