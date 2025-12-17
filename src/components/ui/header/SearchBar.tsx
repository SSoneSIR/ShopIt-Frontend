import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = "Search Products",
  className = "",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-50 border border-gray-300 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
      />
    </div>
  );
}

