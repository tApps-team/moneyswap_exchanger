import { useActualCourseQuery } from "@/entities/direction";
import { Card, CardContent } from "@/shared/ui";

type ActualCourseProps = {
  valuteFrom?: string;
  valuteTo?: string;
};
export const ActualCourse = (props: ActualCourseProps) => {
  const { valuteFrom, valuteTo } = props;
  const { data: actualCourse } = useActualCourseQuery(
    { valute_from: valuteFrom, valute_to: valuteTo },
    {
      skip: !valuteTo || !valuteFrom,
    }
  );
  return (
    <Card className="p-0">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex">
          <img
            src={actualCourse?.icon_valute_from}
            alt={`icon ${actualCourse?.valute_to}`}
            width={32}
            height={32}
          />
          <div>{actualCourse?.valute_from}</div>
          <div>{actualCourse?.in_count}</div>
        </div>
        <div>=</div>
        <div className="flex">
          <img
            src={actualCourse?.icon_valute_to}
            alt={`icon ${actualCourse?.valute_to}`}
            width={32}
            height={32}
          />
          <div>{actualCourse?.valute_to}</div>
          <div>{actualCourse?.out_count}</div>
        </div>
      </CardContent>
    </Card>
  );
};
