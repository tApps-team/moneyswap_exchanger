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
      className="p-4 cursor-pointer rounded-[35px] border border-white bg-darkGray"
    >
      <CardContent className="p-0 flex gap-2 items-center  text-white">
        {country_flag && (
          <img
            width={42}
            height={42}
            src={country_flag}
            alt={`country flag ${name}`}
          />
        )}
        <div className="text-nowrap">{name}</div>
      </CardContent>
    </Card>
  );
};
