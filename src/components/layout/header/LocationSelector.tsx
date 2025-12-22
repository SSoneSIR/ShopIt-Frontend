import { useState, useRef, useEffect } from "react";
import { MapPin, RefreshCw, Plus, X } from "lucide-react";
import Logo from "./Logo";

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const locations = [
  "Kathmandu, Bagmati",
  "Pokhara, Gandaki",
  "Lalitpur, Bagmati",
  "Bhaktapur, Bagmati",
  "Biratnagar, Koshi",
  "Birgunj, Madhesh",
  "Hetauda, Bagmati",
  "Dharan, Koshi",
];

export default function LocationSelector({
  selectedLocation,
  onLocationChange,
}: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (locationRef.current && !locationRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLocations = locationSearch.trim()
    ? locations.filter((loc) => {
        const searchLower = locationSearch.toLowerCase().trim();
        const [city, state] = loc.split(", ");
        return (
          city.toLowerCase().startsWith(searchLower) ||
          state.toLowerCase().startsWith(searchLower)
        );
      })
    : [];

  const handleLocationSelect = (location: string) => {
    onLocationChange(location);
    setIsOpen(false);
    setLocationSearch("");
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationChange(
            `${position.coords.latitude.toFixed(
              4
            )}, ${position.coords.longitude.toFixed(4)}`
          );
          setIsOpen(false);
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="relative flex-shrink-0" ref={locationRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <MapPin className="w-5 h-5 text-green-600" />
        <div className="text-left">
          <p className="text-sm font-semibold text-green-600 whitespace-nowrap">
            Select Your Location
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <span className="font-medium">Select:</span>
            <span className="truncate max-w-[140px]">{selectedLocation}</span>
            <RefreshCw className="w-3 h-3" />
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[380px] bg-white border border-white rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium text-sm">
                  Welcome to
                </span>
                <Logo className="h-6 w-auto" />
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setLocationSearch("");
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLocateMe}
                className="flex-shrink-0 px-4 py-2 bg-gray-900 rounded-3xl cursor-pointer hover:bg-gray-700 text-white transition-all flex items-center justify-center gap-2 text-xs font-semibold shadow-md"
              >
                <MapPin className="w-3.5 h-3.5" />
                Locate Me
              </button>

              <span className="text-gray-500 text-xs">or</span>

              <div className="flex-grow relative">
                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-gray-200 rounded-xl bg-white hover:border-green-500 focus-within:border-green-500 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter Your Location"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="flex-grow-[2] text-xs focus:outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  <button className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors flex-shrink-0">
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {locationSearch && (
            <div className="max-h-48 overflow-y-auto border-t border-gray-100">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left px-4 py-2 hover:bg-green-50 transition-colors text-xs border-b border-gray-100 last:border-b-0 flex items-center gap-2 group cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    <span className="group-hover:text-green-600 transition-colors">
                      {location}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-center text-gray-500 text-xs">
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

