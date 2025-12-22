import { cn } from "../../lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton = ({ className, style }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      style={style}
    />
  );
};

export { Skeleton };
