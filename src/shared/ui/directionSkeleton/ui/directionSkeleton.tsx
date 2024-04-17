import { Skeleton } from "../../skeleton";

export const DirectionSkeleton = () => {
  return (
    <Skeleton className="flex flex-col justify-between bg-[#bbbbbb] h-[150px] rounded-[35px] overflow-hidden pt-[25px] p-[20px]">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex w-full space-x-2">
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
          <Skeleton className="w-[70%] h-[40px] rounded-[35px]" />
        </div>
        <div>
          <div className="flex w-full space-x-2">
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
            <Skeleton className="w-[70%] h-[40px] rounded-[35px]" />
          </div>
        </div>
      </div>
      <div className="flex items-center w-[80%] space-x-2">
        <Skeleton className="w-[60px] h-[35px] rounded-[35px] flex justify-end items-center">
          <Skeleton className="w-[25px] h-[25px] rounded-full bg-[#bbbbbb] mr-2" />
        </Skeleton>
        <Skeleton className="w-[60%] h-[20px] rounded-[35px]" />
      </div>
    </Skeleton>
  );
};
