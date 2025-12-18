import { useState } from "react";
import Logo from "./header/Logo";
import CategoriesDropdown from "./header/CategoriesDropdown";
import SearchBar from "./header/SearchBar";
import LocationSelector from "./header/LocationSelector";
import CartButton from "./header/CartButton";
import LoginButton from "./header/LoginButton";
import { Menu, X, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  cartCount: number;
  onCartClick?: () => void;
}

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

export default function Header({ cartCount = 3, onCartClick }: HeaderProps) {
  const [selectedLocation, setSelectedLocation] = useState("Set Location here");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        {/* Desktop Header (lg and above) */}
        <div className="hidden lg:flex flex-nowrap items-center gap-4">
          <div className="flex-shrink-0">
            <Logo onClick={handleLogoClick} className="h-16 w-48" />
          </div>

          <div className="flex-grow-[4]"></div>

          <CategoriesDropdown categories={categories} />

          <SearchBar className="flex-grow-2" />

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

          <SearchBar className="flex-grow" />

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
          <div className="flex items-center justify-between gap-2">
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
              <Logo className="h-10 sm:h-12 w-auto" />
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <CartButton cartCount={cartCount} onClick={onCartClick} />
              <LoginButton />
            </div>
          </div>

          <div className="mt-2 sm:mt-3 flex items-center gap-2">
            <SearchBar className="flex-grow" />
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors border border-gray-300 bg-white flex-shrink-0">
              <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
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
  );
}
