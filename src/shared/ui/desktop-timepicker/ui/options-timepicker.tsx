import { FC } from "react";
import { ScrollArea } from "../../scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../select";
import { LogoButtonIcon } from "@/shared/assets";

const timeArray = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

interface OptionsTimepickerProps {
  setTime: (time: string) => void;
  time: string;
}

export const OptionsTimepicker: FC<OptionsTimepickerProps> = ({
  setTime,
  time,
}) => {
  return (
    <Select onValueChange={setTime}>
      <SelectTrigger className="w-full h-[100%] p-3 pr-10 bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 relative text-base">
        {time}
        <LogoButtonIcon
          width={26}
          height={26}
          className="absolute -translate-y-[50%] top-[50%] right-3"
        />
      </SelectTrigger>
      <SelectContent className="bg-darkGray border-0 shadow-[2px_2px_10px_3px_rgba(0,0,0,0.35)] rounded-2xl p-0">
        <SelectGroup>
          <ScrollArea className="h-[30dvh] max-h-[300px] p-3">
            {timeArray.map((item) => (
              <SelectItem
                value={item}
                key={item}
                className={`flex justify-center items-center text-white font-medium cursor-pointer text-center`}
              >
                {item}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
