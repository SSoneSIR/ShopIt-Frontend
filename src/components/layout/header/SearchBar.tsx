import { Search, X, Star, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  className?: string;
  onFocus?: () => void;
  onClose?: () => void;
  isFocused?: boolean;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  onSubmit?: (query: string) => void;
}

export default function SearchBar({
  className = "",
  onFocus,
  onClose,
  isFocused,
  onSearchChange,
  searchQuery: externalSearchQuery,
  onSubmit,
}: SearchBarProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const searchQuery =
    externalSearchQuery !== undefined
      ? externalSearchQuery
      : internalSearchQuery;
  const setSearchQuery =
    onSearchChange !== undefined ? onSearchChange : setInternalSearchQuery;
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Update internal state when external search query changes
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setInternalSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(searchQuery);
    }
  };

  return (
    <>
      {/* Search Container */}
      <div
        ref={searchRef}
        className={`${
          isOpen && !isFocused ? "fixed top-4 left-4 right-4 z-50" : "relative"
        } ${className}`}
        style={{ position: isFocused ? "relative" : undefined }}
      >
        {/* Search Input */}
        <form onSubmit={handleSubmit}>
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
              onBlur={() => {
                // Keep dropdown open when clicking inside it
                setTimeout(() => {
                  if (
                    searchRef.current &&
                    !searchRef.current.contains(document.activeElement)
                  ) {
                    setIsOpen(false);
                  }
                }, 100);
              }}
              autoFocus={isFocused}
              className={`w-full bg-gray-50 border rounded-full py-3 pl-12 pr-12 text-sm focus:outline-none transition-all duration-300 ease-in-out ${
                isFocused
                  ? "border-green-500 focus:border-green-500"
                  : "border-gray-200 focus:border-gray-300 focus:bg-white"
              }`}
            />
          </div>
        </form>
      </div>
    </>
  );
}
