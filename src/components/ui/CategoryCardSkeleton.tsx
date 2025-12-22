import { Skeleton } from "./Skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="relative rounded-xl md:rounded-2xl lg:rounded-[20px] w-full aspect-[3/2] bg-gray-200 animate-pulse">
      {/* Title skeleton */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4">
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      {/* Images skeleton */}
      <div className="absolute bottom-0 right-0 w-[70%] md:w-[75%] h-[75%] md:h-[80%] flex items-end justify-end p-1 md:p-0">
        <div className="flex">
          <Skeleton className="w-16 h-16 rounded mr-2" />
          <Skeleton className="w-16 h-16 rounded mr-2" />
          <Skeleton className="w-16 h-16 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
