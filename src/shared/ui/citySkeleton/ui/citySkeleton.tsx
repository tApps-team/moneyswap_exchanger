import { Skeleton } from "../../skeleton";

export const CitySkeleton = () => {
  return (
    <Skeleton className="flex h-[70px] w-[100%] gap-4 rounded-[35px] overflow-hidden items-center justify-end bg-[#bbbbbb]">
      <Skeleton className="ml-[15px] flex-none h-[40px] w-[40px] rounded-full" />
      <Skeleton className="flex-grow h-[25px] w-[90px] rounded-full" />
      <Skeleton className="flex-none h-[70px] w-[70px] rounded-full" />
    </Skeleton>
  );
};
