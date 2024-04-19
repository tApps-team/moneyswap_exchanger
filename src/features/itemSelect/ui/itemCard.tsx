import { Currency } from "@/entities/direction";
import { City, Country } from "@/entities/location";
import { LogoButtonIcon } from "@/shared/assets";
import { Card, CardContent } from "@/shared/ui";

type ItemCardProps<T> = {
  item: T;
  onClick: () => void;
};
export const ItemCard = <T extends Partial<City & Country & Currency>>(
  props: ItemCardProps<T>
) => {
  const { item, onClick } = props;

  return (
    <Card
      onClick={onClick}
      className="text-wrap p-4 cursor-pointer max-h-[70px] rounded-full border border-white bg-darkGray"
    >
      <CardContent className="p-0 flex gap-2 items-center  text-white">
        {item.country_flag || item.icon_url ? (
          <img
            width={42}
            height={42}
            src={item.country_flag || item.icon_url}
            alt={`country flag ${item.name}`}
          />
        ) : (
          <LogoButtonIcon
            fill="white"
            width={42}
            height={42}
            className="-rotate-90"
          />
        )}
        <div className="">{item.name?.toUpperCase()}</div>
      </CardContent>
    </Card>
  );
};
