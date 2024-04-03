import { Card, CardContent } from "@/shared/ui";
import { City, Country } from "../model/types";

type LocationCardProps = Country &
  City & {
    onClick: () => void;
  };
export const LocationCard = (props: LocationCardProps) => {
  const { code_name, id, name, onClick, country_icon } = props;
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardContent className="flex gap-2">
        <div>image</div>
        <div>{name}</div>
      </CardContent>
    </Card>
  );
};
