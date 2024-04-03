import { Direction } from "@/features/direction";
import { MyCities } from "@/widgets/myCities";
import { MyDirection } from "@/widgets/myDirection";

export const HomePage = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4">
      <MyCities />
      <MyDirection />
      <Direction />
    </div>
  );
};
