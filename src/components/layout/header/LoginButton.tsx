import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginButton() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <button
      onClick={handleLoginClick}
      disabled={isNavigating}
      className={`bg-green-600 text-white px-8 py-3 cursor-pointer rounded-full hover:bg-green-700 transition-all text-sm font-semibold shadow-sm whitespace-nowrap flex-shrink-0 ${
        isNavigating ? "scale-95 opacity-70" : "scale-100 opacity-100"
      }`}
    >
      {isNavigating ? "Loading..." : "Login"}
    </button>
  );
}

