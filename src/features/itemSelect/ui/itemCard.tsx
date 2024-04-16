import { Currency } from "@/entities/direction";
import { City, Country } from "@/entities/location";
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
      className="p-4 cursor-pointer rounded-full border border-white bg-darkGray"
    >
      <CardContent className="p-0 flex gap-2 items-center  text-white">
        {(item.country_flag || item.icon_url) && (
          <img
            width={42}
            height={42}
            src={item.country_flag || item.icon_url}
            alt={`country flag ${item.name}`}
          />
        )}
        <div className="text-nowrap">{item.name}</div>
      </CardContent>
    </Card>
  );
};
