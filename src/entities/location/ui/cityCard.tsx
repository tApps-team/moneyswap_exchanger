import { Card, CardContent } from "@/shared/ui";
import { City } from "../model/types";
import { Settings } from "lucide-react";
export type CityCardProps = City & {
  imageUrl: string;
};
export const CityCard = (props: CityCardProps) => {
  const { code_name, id, imageUrl, name } = props;
  return (
    // <Card className="w-52 h-16 rounded-xl">
    //   <CardContent className="p-2 w-full h-full grid grid-cols-[auto,1fr,auto] gap-4 justify-between items-center">
    //     <div>img</div>
    //     <div>{name && "Бангкок"}</div>
    //     <div className=" bg-[#E2FF54]">
    //       <Settings />
    //     </div>
    //   </CardContent>
    // </Card>
    <Card className="w-52 h-16 rounded-xl"></Card>
    // <div className="w-52 border h-16 rounded-xl">
    //   <div className="w-full h-full grid grid-cols-[auto,1fr,auto] gap-6 justify-between items-center">
    //     <div>img</div>
    //     <div>{name && "Бангкок"}</div>
    //     <div className=" bg-[#E2FF54]">
    //       <Settings />
    //     </div>
    //   </div>
    // </div>
  );
};
