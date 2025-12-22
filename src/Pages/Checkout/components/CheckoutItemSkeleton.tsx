import { Skeleton } from "../../../components/skeletons/Skeleton";

const CheckoutItemSkeleton = () => {
  return (
    <div className="rounded-lg p-3 flex gap-2 border-b border-gray-100 last:border-b-0 bg-white">
      {/* Remove Button Skeleton */}
      <Skeleton className="w-4 h-4 rounded" />

      {/* Product Image Skeleton */}
      <Skeleton className="w-16 h-16 rounded-lg" />

      {/* Product Details Skeleton */}
      <div className="flex-1 min-w-0">
        <Skeleton className="h-4 w-3/4 mb-2 rounded" />
        <Skeleton className="h-3 w-1/2 mb-3 rounded" />

        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-4 w-16 rounded" />

          <div className="flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-10 h-5 rounded-2xl" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItemSkeleton;
