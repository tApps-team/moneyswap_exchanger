import { Card, CardContent } from "@/shared/ui";
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

  return (
    <Card className="p-0 bg-mainColor h-[70px] text-darkGray overflow-hidden rounded-full border-none">
      <CardContent className="p-4 h-full flex items-center">
        {actualCourse ? (
          <div className="grid grid-cols-[auto,10px,auto] justify-between items-center gap-4">
            <div className="flex items-center truncate gap-2">
              <img
                src={actualCourse?.icon_valute_from}
                alt={`icon ${actualCourse?.valute_to}`}
                width={32}
                height={32}
              />
              <div className="flex flex-wrap items-center leading-0 truncate">
                <div className="mr-1 font-semibold text-[14px] truncate">
                  {actualCourse?.in_count}
                </div>
                <div className="font-normal text-[14px] truncate">
                  {actualCourse?.valute_from}
                </div>
              </div>
            </div>
            <div>=</div>
            <div className="flex items-center truncate gap-2">
              <img
                src={actualCourse?.icon_valute_to}
                alt={`icon ${actualCourse?.valute_to}`}
                width={32}
                height={32}
              />
              <div className="flex flex-wrap items-center leading-0 truncate">
                <div className="mr-1 font-semibold text-[14px] truncate">
                  {actualCourse?.out_count}
                </div>
                <div className="font-normal text-[14px] truncate">
                  {actualCourse?.valute_to}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center uppercase text-[14px]">
            Актуальный курс
          </div>
        )}
      </CardContent>
    </Card>
  );
};
