import { Skeleton } from "./Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="rounded-3xl p-4 bg-white">
      {/* Image skeleton */}
      <div className="h-28 flex items-center justify-center mb-3 bg-white rounded-lg">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-4 w-3/4 mb-2 rounded" />
      <Skeleton className="h-4 w-1/2 mb-3 rounded" />

      {/* Rating and weight skeleton */}
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="h-3 w-16 rounded" />
        <Skeleton className="h-3 w-8 rounded" />
      </div>

      {/* Price and button skeleton */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
