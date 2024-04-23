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
      className="cursor-pointer h-[70px] truncate rounded-full border-2 border-lightGray bg-darkGray"
    >
      <CardContent className="grid grid-flow-col p-3.5 justify-start gap-5 items-center    text-white">
        {item.country_flag || item.icon_url ? (
          <img
            width={40}
            height={40}
            src={item.country_flag || item.icon_url}
            alt={`country flag ${item.name}`}
          />
        ) : (
          <LogoButtonIcon
            fill="white"
            width={40}
            height={40}
            className="-rotate-90"
          />
        )}

        {item.code_name ? (
          <div>
            <div className="uppercase">{item.name}</div>
          </div>
        ) : (
          <div className="uppercase">{item.name}</div>
        )}
      </CardContent>
    </Card>
  );
};
