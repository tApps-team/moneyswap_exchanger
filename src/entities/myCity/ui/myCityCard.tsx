import { paths } from "@/shared/routing";
import { Card, CardContent } from "@/shared/ui";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { MyCity } from "../model/types";
import { FC } from "react";
import { useAppDispatch } from "@/shared/model";
import { myCitySlice } from "../model/myCitySlice";

export type MyCityCardProps = {
  city: MyCity;
  onClick?: () => void;
};

export const MyCityCard: FC<MyCityCardProps> = ({ city, onClick }) => {
  const dispatch = useAppDispatch();
  const setActiveCity = () => {
    dispatch(myCitySlice.actions.setMyCity(city));
  };
  return (
    <Card className="w-52 h-16 rounded-xl" onClick={setActiveCity}>
      <CardContent className="w-full h-full flex  p-0 pl-3 gap-3 justify-between items-center">
        <div className="flex-2">
          <img
            className="rounded-full w-8 h-8 object-cover"
            src={city.country_flag}
            alt={`Иконка ${city.name}`}
          />
        </div>
        <div className="flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {city.name}
        </div>
        <Link
          to={paths.locationEdit}
          className="h-full w-12 items-center flex flex-0 justify-center rounded-l-none rounded-xl bg-[#E2FF54]"
          onClick={onClick}
        >
          <Settings />
        </Link>
      </CardContent>
    </Card>
  );
};
