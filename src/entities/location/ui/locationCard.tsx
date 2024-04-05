import { Card, CardContent } from "@/shared/ui";
import { City, Country } from "../model/types";

type LocationCardProps = Partial<
  Country &
    City & {
      onClick: () => void;
    }
>;
export const LocationCard = (props: LocationCardProps) => {
  const { code_name, id, name, onClick, country_flag } = props;
  return (
    <Card
      onClick={onClick}
      className="p-4 cursor-pointer rounded-full border-2 border-white bg-gray-600"
    >
      <CardContent className="p-0 flex gap-2 items-center  text-white">
        {country_flag && (
          <img
            width={32}
            height={32}
            src={country_flag}
            alt={`country flag ${name}`}
          />
        )}
        <div className="text-nowrap">{name}</div>
      </CardContent>
    </Card>
  );
};
