import { useActualCourseQuery } from "@/entities/direction";
import { Button } from "@/shared/ui";
import { ChevronDown, Circle } from "lucide-react";

type ActualCourseProps = {
  valuteFrom: string;
  valuteTo: string;
  valuteGiveIcon: string;
  valuteGetIcon: string;
};
export const ActualCourse = (props: ActualCourseProps) => {
  const { valuteFrom, valuteGetIcon, valuteGiveIcon, valuteTo } = props;
  const { data: actualCourse } = useActualCourseQuery(
    { valute_from: valuteFrom, valute_to: valuteTo },
    {
      skip: !valuteTo || !valuteFrom,
    }
  );
  return (
    <Button
      disabled={!valuteTo || !valuteFrom}
      className="w-full justify-between items-center rounded-full gap-2 select-none"
      variant={"outline"}
    >
      <div className="flex ">
        <div>{actualCourse}</div>
        <ChevronDown />
      </div>
    </Button>
  );
};
