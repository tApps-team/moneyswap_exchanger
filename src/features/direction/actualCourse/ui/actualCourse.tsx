import { LogoButtonIcon } from "@/shared/assets";
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
    <Card className="p-0 bg-mainColor h-[70px] text-darkGray overflow-hidden rounded-full">
      <CardContent className="p-4 flex items-center gap-4 ">
        {actualCourse ? (
          <>
            <div className="flex items-center truncate gap-1">
              <img
                src={actualCourse?.icon_valute_from}
                alt={`icon ${actualCourse?.valute_to}`}
                width={32}
                height={32}
              />
              <div>{actualCourse?.in_count}</div>
              <div>{actualCourse?.valute_from}</div>
            </div>
            <div>=</div>

            <div className="flex items-center truncate gap-1 ">
              <img
                src={actualCourse?.icon_valute_to}
                alt={`icon ${actualCourse?.valute_to}`}
                width={32}
                height={32}
              />
              <div>{actualCourse?.out_count}</div>
              <div>{actualCourse?.valute_to}</div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div>Актуальный курс</div>
            <LogoButtonIcon width={28} height={28} fill="#2D2D2D" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
