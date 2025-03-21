import { LogoButtonIcon } from "@/shared/assets";
import { Lang } from "@/shared/config";
import { AllCitiesFlag } from "@/shared/types";
import { Card, CardContent } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { BaseItem } from "../model/types";

type ItemCardProps<T> = {
  item: T;
  onClick: () => void;
  isCity?: boolean;
};

export const ItemCard = <T extends BaseItem>(
  props: ItemCardProps<T>
) => {
  const { i18n } = useTranslation();
  const { item, onClick, isCity } = props;

  const name = i18n.language === Lang.ru ? item?.name?.ru : item?.name?.en;

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer  h-mainHeight rounded-[35px] border-0 border-lightGray bg-darkGray shadow-[1px_2px_8px_1px_rgba(0,0,0,0.6)]"
    >
      <CardContent className="grid h-full grid-flow-col px-4 py-2 justify-start gap-3 items-center text-white rounded-full overflow-hidden">
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
            fill={item?.code_name === AllCitiesFlag ? "#f6ff5f" : "white"}
            width={34}
            height={34}
            className="-rotate-90"
          />
        )}

        {item?.code_name ? (
          <div>
            <div
              className={`uppercase truncate text-sm sm:text-lg ${
                isCity ? "font-semibold" : "font_unbounded font-normal"
              }`}
            >
              {name}
            </div>
            <div
              className={`uppercase truncate text-sm font-thin ${
                isCity ? "" : "font_unbounded"
              }`}
            >
              {item?.code_name}
            </div>
          </div>
        ) : (
          <div className="truncate font-medium">{name}</div>
        )}
      </CardContent>
    </Card>
  );
};
