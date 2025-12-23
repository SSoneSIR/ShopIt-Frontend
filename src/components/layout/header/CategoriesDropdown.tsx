import { useState, useRef, useEffect } from "react";
import { ChevronDown, Package } from "lucide-react";

interface CategoriesDropdownProps {
  categories: string[];
}

export default function CategoriesDropdown({
  categories,
}: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
      >
        <Package className="w-4 h-4" />
        Categories
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-50 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setIsOpen(false)}
              className="w-full text-left cursor-pointer px-4 py-3 hover:bg-green-50 hover:text-green-600 transition-colors text-sm border-b border-gray-100 last:border-b-0"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
