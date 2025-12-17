import { MapPin, Truck, RefreshCw } from "lucide-react";

interface DeliveryInfoProps {
  userName: string;
  userPhone: string;
  deliveryAddress: string;
  estimatedArrival: string;
}

export default function DeliveryInfo({
  userName,
  userPhone,
  deliveryAddress,
  estimatedArrival,
}: DeliveryInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <p className="text-gray-900 font-semibold text-lg">
            {userName} {userPhone}
          </p>
        </div>
        <div className="flex items-start justify-center gap-2">
          <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm">{deliveryAddress}</p>
          <button className="ml-2 p-2 bg-green-600 rounded-full hover:bg-green-700 transition-colors">
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-green-600 rounded-lg bg-green-50 w-fit mx-auto">
          <Truck className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-semibold">
            Arrives in {estimatedArrival}
          </span>
        </div>
      </div>
    </div>
  );
}
