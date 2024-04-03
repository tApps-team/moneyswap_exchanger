import { Card, CardContent } from "@/shared/ui";
import { City } from "../model/types";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "@/shared/routing";
export type CityCardProps = City & {
  imageUrl: string;
};
export const CityCard = (props: CityCardProps) => {
  const { code_name, id, imageUrl, name } = props;
  return (
    // <Card className="w-52 h-16 rounded-xl">
    //   <CardContent className="p-0 w-full h-full grid-flow-row-dense grid grid-cols-[auto,1fr,auto] gap-4 justify-between items-center">
    //     <div>img</div>
    //     <div>{name && "Бангкок"}</div>
    //     <div className="bg-[#E2FF54]  ">
    //       <Settings />
    //     </div>
    //   </CardContent>
    // </Card>
    <Card className="w-52 h-16 rounded-xl ">
      <CardContent className="w-full h-full flex  p-0 pl-3 gap-3 justify-between items-center">
        <div className="flex-2">
          <img
            className="rounded-full w-8 h-8 object-cover"
            src={imageUrl}
            alt={`Иконка ${name}`}
          />
        </div>
        <div className="flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {name}
        </div>
        <Link
          to={paths.locationEdit}
          className="h-full w-12 items-center flex flex-0 justify-center rounded-l-none rounded-xl bg-[#E2FF54]"
        >
          <Settings />
        </Link>
      </CardContent>
    </Card>
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
