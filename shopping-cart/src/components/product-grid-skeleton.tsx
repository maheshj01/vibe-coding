import { Skeleton } from "./ui/skeleton";

export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <Skeleton className="h-48 w-full" />
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

