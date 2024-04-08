import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Checkbox,
} from "@/shared/ui";
import { Direction } from "../model/types";
import { FC, TouchEvent, TouchEventHandler, useRef, useState } from "react";
import { DeleteDirection, EditDirection } from "@/features/direction";

interface DirectionCardProps {
  direction: Direction;
}

export const DirectionCard: FC<DirectionCardProps> = ({ direction }) => {
  // const ref = useRef<HTMLDivElement | null>(null);
  // const [startX, setStartX] = useState<number>(0);
  // const [endX, setEndX] = useState<number | null>(null);
  // const onTouchStart = (e: TouchEvent) => {
  //   const start = e.targetTouches[0].clientX;
  //   setStartX(start);
  // };
  // const onTouchMove = (e: TouchEvent) => {
  //   const currentX = e.targetTouches[0].clientX;
  //   console.log(currentX - startX);
  //   ref.current.style.transform = `translateX(${currentX - startX}px)`;
  // };
  // const onTouchEnd = () => {
  //   ref.current.style.transform = `translateX(0px)`;
  // };

  // return (
  //   <Card
  //     ref={ref}
  //     onTouchStart={onTouchStart}
  //     onTouchMove={onTouchMove}
  //     onTouchEnd={onTouchEnd}
  //     className="rounded-xl select-none "
  //   >
  //     <CardContent className="relative p-4 flex justify-between items-center">
  //       <div className="flex items-center gap-1">
  //         <div>img</div>
  //         <div>35,98</div>
  //         <div>THB</div>
  //         <div>=</div>
  //         <div>img</div>
  //         <div>1</div>
  //         <div>BTC</div>
  //       </div>
  //       <Checkbox className="data-[state=checked]:bg-white data-[state=checked]:text-black" />
  //     </CardContent>
  //     <div className="flex">
  //       <EditDirection />
  //       <DeleteDirection />
  //     </div>
  //     <CardFooter className="bg-[#BBBBBB] rounded-b-xl "></CardFooter>
  //   </Card>
  // );

  return (
    <div>
      <div>{direction.icon_valute_from}</div>
      <div>{direction.icon_valute_to}</div>
      <div>{direction.is_active}</div>
      <div>{direction.valute_from}</div>
      <div>{direction.valute_to}</div>
    </div>
  );
};
