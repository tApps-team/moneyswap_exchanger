import { Card, CardContent } from "@/shared/ui";
import { Country } from "../model/types";

type CountryCardProps = Country & {
  onClick: () => void;
};
export const CountryCard = (props: CountryCardProps) => {
  const { id, country_icon, name, onClick } = props;
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardContent className="flex gap-2">
        <div>image</div>
        <div>{name}</div>
      </CardContent>
    </Card>
  );
};
