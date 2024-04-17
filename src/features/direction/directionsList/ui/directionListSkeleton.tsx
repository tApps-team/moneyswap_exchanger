import { Skeleton } from "@/shared/ui";

export const DirectionListSkeleton = () => {
  return (
    <div className="mt-2 grid gap-3 overflow-auto max-h-[35vh]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[150px] w-full rounded-[35px]" />
      ))}
    </div>
  );
};
