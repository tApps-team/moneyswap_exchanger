import { City } from "@/entities/location";
import { paths } from "@/shared/routing";
import { Card, CardContent } from "@/shared/ui";

import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
export type CityCardProps = City & {
  onClick?: () => void;
};
export const CityCardCarouselItem = (props: CityCardProps) => {
  const { code_name, id, imageUrl, name, onClick } = props;
  return (
    <Card onClick={onClick} className="w-52 h-16 rounded-xl ">
      <CardContent className="w-full h-full flex  p-0 pl-2 gap-2 justify-between items-center">
        <div className="flex-2">img</div>
        <div className="flex-1">name</div>
        <Link
          to={paths.locationEdit}
          className="h-full w-12 items-center flex flex-0 justify-center rounded-l-none rounded-xl bg-[#E2FF54]"
        >
          <Settings />
        </Link>
      </CardContent>
    </Card>
  );
};
