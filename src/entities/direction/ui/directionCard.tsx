import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Checkbox,
} from "@/shared/ui";
import { Direction } from "../model/directionType";

export type DirectionCardProps = Direction;
export const DirectionCard = (props: Partial<DirectionCardProps>) => {
  const {
    fromfee,
    icon_valute_from,
    icon_valute_to,
    id,
    in_count,
    isActive,
    max_amount,
    min_amount,
    name,
    out_count,
    params,
    partner_link,
    valute_from,
    valute_to,
  } = props;
  return (
    <Card className="w-full h-16 rounded-xl">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div>img</div>
          <div>35,98</div>
          <div>THB</div>
          <div>=</div>
          <div>img</div>
          <div>1</div>
          <div>BTC</div>
        </div>
        <Checkbox className="data-[state=checked]:bg-white data-[state=checked]:text-black" />
      </CardContent>
    </Card>
  );
};
