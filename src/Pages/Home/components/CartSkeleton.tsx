import { Skeleton } from "../../../components/skeletons/Skeleton";

const CartItemSkeleton = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex gap-4 border border-gray-200">
      {/* Product Image Skeleton */}
      <Skeleton className="w-20 h-20 rounded-lg" />

      {/* Product Details Skeleton */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Skeleton className="h-4 w-3/4 mb-2 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>

        {/* Quantity Controls Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-6 rounded" />
          <Skeleton className="w-6 h-4 rounded" />
          <Skeleton className="w-8 h-6 rounded" />
          <Skeleton className="ml-auto w-16 h-4 rounded" />
        </div>
      </div>

      {/* Remove Button Skeleton */}
      <Skeleton className="w-5 h-5 rounded" />
    </div>
  );
};

export default CartItemSkeleton;
