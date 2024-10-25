import { Currency } from "@/entities/direction";
import { City, Country } from "@/entities/location";
import { LogoButtonIcon } from "@/shared/assets";
import { Lang } from "@/shared/config";
import { Card, CardContent } from "@/shared/ui";
import { useTranslation } from "react-i18next";

type ItemCardProps<T> = {
  item: T;
  onClick: () => void;
};
export const ItemCard = <T extends Partial<City & Country & Currency>>(
  props: ItemCardProps<T>
) => {
  const { i18n } = useTranslation();
  const { item, onClick } = props;

  const name = i18n.language === Lang.ru ? item?.name?.ru : item?.name?.en;

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer  h-mainHeight rounded-[35px] border-0 border-lightGray bg-darkGray shadow-[1px_2px_8px_1px_rgba(0,0,0,0.6)]"
    >
      <CardContent className="grid h-full   grid-flow-col px-4 py-2 justify-start  gap-3 items-center text-white rounded-full overflow-hidden">
        {item?.country_flag || item?.icon_url ? (
          <img
            width={34}
            height={34}
            src={item?.country_flag || item?.icon_url}
            alt={`country flag ${name}`}
            className="rounded-full overflow-hidden"
          />
        ) : (
          <LogoButtonIcon
            fill="white"
            width={34}
            height={34}
            className="-rotate-90"
          />
        )}

        {item?.code_name ? (
          <div>
            <div className="uppercase truncate font-medium text-sm sm:text-lg">
              {name}
            </div>
            <div className="uppercase truncate font-light">
              {item?.code_name}
            </div>
          </div>
        ) : (
          <div className="uppercase truncate font-medium">{name}</div>
        )}
      </CardContent>
    </Card>
  );
};
