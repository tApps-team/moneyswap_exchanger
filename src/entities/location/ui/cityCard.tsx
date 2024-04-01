import { Card, CardContent } from "@/shared/ui";
import { City } from "../model/types";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
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
      <CardContent className="w-full h-full flex  p-0 pl-2 gap-2 justify-between items-center">
        <div className="flex-2">img</div>
        <div className="flex-1">name</div>
        <Link
          to={"/profile"}
          className="h-full w-12 items-center flex flex-0 justify-center rounded-l-none rounded-xl bg-[#E2FF54]"
        >
          {/* <div > */}
          <Settings />
          {/* </div> */}
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
