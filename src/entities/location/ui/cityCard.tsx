import { Card, CardContent } from "@/shared/ui";
import { City } from "../model/types";

type CityCardProps = City & {
  onClick: () => void;
};
export const CityCard = (props: CityCardProps) => {
  const { code_name, id, name, onClick } = props;
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardContent className="flex gap-2">
        <div>image</div>
        <div>{name}</div>
      </CardContent>
    </Card>
  );
};
