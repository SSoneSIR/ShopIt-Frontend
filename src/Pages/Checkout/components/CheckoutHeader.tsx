import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutHeader() {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-center gap-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-2xl font-bold text-gray-900">Cart</h1>
    </div>
  );
}
