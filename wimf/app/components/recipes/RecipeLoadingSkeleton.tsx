export function RecipeCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 h-48 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
}

export function RecipeLoadingGrid() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
