import { DirectionCard } from "@/entities/direction";
import { MyCities } from "@/widgets/myCities";
import { MyCustomAuthReq } from "@/widgets/myCustomAuthReq/ui/myCustomAuthReq";
import { MyDirection } from "@/widgets/myDirection";

export const HomePage = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4">
      <MyCities />
      <MyDirection />
      <DirectionCard />
    </div>
    //   <div>
    //   <MyCustomAuthReq />
    // </div>
  );
};
