import { FC, useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../input-otp";

interface DesktopTimepickerProps {
  setTime: (time: string) => void;
  time: string;
}

export const DesktopTimepicker: FC<DesktopTimepickerProps> = ({
  setTime,
  time,
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const sanitizedTime = time.replace(":", "");
    setCurrentTime(sanitizedTime);
  }, []);

  const setTimeToForm = (value: string) => {
    setCurrentTime(value);

    const paddedValue = value.padEnd(4, "0");
    const formattedTime = `${paddedValue.slice(0, 2)}:${paddedValue.slice(
      2,
      4
    )}`;
    setTime(formattedTime);
  };

  return (
    <InputOTP
      maxLength={4}
      className="justify-center"
      value={currentTime}
      onChange={(value) => setTimeToForm(value)}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} className="h-8 w-8 text-white font-medium" />
        <InputOTPSlot index={1} className="h-8 w-8 text-white font-medium" />
      </InputOTPGroup>
      <span className="text-2xl text-white">:</span>
      <InputOTPGroup>
        <InputOTPSlot index={2} className="h-8 w-8 text-white font-medium" />
        <InputOTPSlot index={3} className="h-8 w-8 text-white font-medium" />
      </InputOTPGroup>
    </InputOTP>
  );
};
