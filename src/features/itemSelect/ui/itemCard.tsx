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
      className="cursor-pointer  h-mainHeight rounded-[35px] border-2 border-lightGray bg-darkGray"
    >
      <CardContent className="grid h-full   grid-flow-col px-4 py-2 justify-start  gap-3 items-center    text-white">
        {item.country_flag || item.icon_url ? (
          <img
            width={34}
            height={34}
            src={item.country_flag || item.icon_url}
            alt={`country flag ${item.name}`}
          />
        ) : (
          <LogoButtonIcon
            fill="white"
            width={34}
            height={34}
            className="-rotate-90"
          />
        )}

        {item.code_name ? (
          <div>
            <div className="uppercase truncate font-semibold">{item.name}</div>
            <div className="uppercase truncate font-light">
              {item.code_name}
            </div>
          </div>
        ) : (
          <div className="uppercase truncate">{item.name}</div>
        )}
      </CardContent>
    </Card>
  );
};
