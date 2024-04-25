import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { IosPickerItem } from "./IosPickerItem";
import "./embla.scss";

type PropType = {
  loop?: EmblaOptionsType["loop"];
  setTime: (time: string) => void;
  time: string;
};

export const TimePicker: React.FC<PropType> = (props) => {
  const { loop, setTime, time } = props;

  const [hoursString, minutesString] = time.split(":");

  const [hours, setHours] = useState<string>(hoursString);
  const [minutes, setMinutes] = useState<string>(minutesString);

  useEffect(() => {
    setTime(`${hours}:${minutes}`);
  }, [minutes, hours]);

  return (
    <div className="embla">
      <IosPickerItem
        slideCount={24}
        perspective="left"
        loop={loop}
        // label="hours"
        hours={Number(hoursString)}
        setHours={setHours}
        type="hours"
      />
      <IosPickerItem
        slideCount={60}
        perspective="right"
        loop={loop}
        // label="min"
        minutes={Number(minutesString)}
        setMinutes={setMinutes}
        type="minutes"
      />
    </div>
  );
};
