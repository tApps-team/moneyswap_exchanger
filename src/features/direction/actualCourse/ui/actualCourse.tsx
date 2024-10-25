import { Card, CardContent } from "@/shared/ui";
import { useTranslation } from "react-i18next";
//refactoring
type ActualCourseProps = {
  actualCourse?: {
    valute_from: string;
    icon_valute_from: string;
    in_count: number;
    valute_to: string;
    icon_valute_to: string;
    out_count: number;
  };
};
export const ActualCourse = (props: ActualCourseProps) => {
  const { actualCourse } = props;

  const { t } = useTranslation();

  return (
    <Card
      className={`p-0 bg-mainColor h-mainHeight text-darkGray overflow-hidden rounded-[35px] border-none ${
        (actualCourse?.in_count === 0 || actualCourse?.out_count === 0) &&
        "bg-darkGray text-lightGray opacity-70"
      }`}
    >
      <CardContent className="p-4 h-full flex items-center">
        {actualCourse &&
        (actualCourse?.in_count !== 0 || actualCourse?.out_count !== 0) ? (
          <div className="grid grid-cols-[auto,10px,auto] justify-between items-center gap-4">
            <div className="flex items-center truncate gap-2">
              <img
                src={actualCourse?.icon_valute_from}
                alt={`icon ${actualCourse?.valute_to}`}
                width={34}
                height={34}
                className="rounded-full overflow-hidden"
              />
              <div className="flex flex-wrap items-center leading-0 truncate">
                <div className="mr-1 font-semibold text-xs sm:text-sm truncate">
                  {actualCourse?.in_count}
                </div>
                <div className="font-normal text-[14px] text-xs sm:text-sm truncate">
                  {actualCourse?.valute_from}
                </div>
              </div>
            </div>
            <div className="text-sm sm:text-lg">=</div>
            <div className="flex items-center truncate gap-2">
              <img
                src={actualCourse?.icon_valute_to}
                alt={`icon ${actualCourse?.valute_to}`}
                width={34}
                height={34}
                className="rounded-full overflow-hidden"
              />
              <div className="flex flex-wrap items-center leading-0 truncate">
                <div className="mr-1 font-semibold text-xs sm:text-sm truncate">
                  {actualCourse?.out_count}
                </div>
                <div className="font-normal text-xs sm:text-sm truncate">
                  {actualCourse?.valute_to}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-row gap-0 justify-center items-center w-full text-center uppercase text-sm sm:text-base font-semibold">
            <p>{t("Актуальный курс")}</p>
            <span className="text-[10px] text-medium leading-3 text-lightGray">
              {(actualCourse?.in_count === 0 ||
                actualCourse?.out_count === 0) &&
                t("Нет данных")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
