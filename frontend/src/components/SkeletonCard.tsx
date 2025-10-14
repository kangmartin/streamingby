export const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="skeleton aspect-[2/3] w-full"></div>
      <div className="card-body p-4">
        <div className="skeleton h-4 w-3/4 mb-2"></div>
        <div className="skeleton h-4 w-1/2 mb-3"></div>
        <div className="flex gap-2">
          <div className="skeleton h-6 w-6 rounded"></div>
          <div className="skeleton h-6 w-6 rounded"></div>
        </div>
        <div className="mt-3">
          <div className="skeleton h-3 w-full mb-1"></div>
          <div className="skeleton h-3 w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: 20 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
