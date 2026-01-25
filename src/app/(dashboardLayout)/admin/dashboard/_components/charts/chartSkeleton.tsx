import { Skeleton } from "@/components/ui/skeleton";

const ChartSkeleton = () => {
  return (
    <div className="w-full h-72 p-4">
      <div className="flex items-end h-48 space-x-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${Math.random() * 80 + 20}px` }}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <Skeleton className="h-2 w-1/4" />
        <Skeleton className="h-2 w-1/4" />
      </div>
    </div>
  );
};
export default ChartSkeleton;
