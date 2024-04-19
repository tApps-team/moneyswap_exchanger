import { cn } from "@/shared/lib";
import { Eye, EyeOff, Lock } from "lucide-react";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export type PasswordInputProps = InputProps & {
  endIcon?: React.ReactNode;
  eyeIcon?: boolean;
};
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, eyeIcon, endIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative">
        <Lock
          color="#F6FF5F"
          className="absolute left-3 top-1/2 -translate-y-1/2 "
        />
        <input
          type={inputType}
          className={cn(
            "flex placeholder:text-white text-white   h-10 w-full rounded-md border border-input bg-transparent px-12 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {!endIcon && eyeIcon && type === "password" && (
          <button
            type="button"
            className="absolute  right-4 top-1/2 -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Eye color="#F6FF5F" className="h-4 w-4 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Спрятать пароль</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              //   <Eye className="h-4 w-4 text-gray-500" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EyeOff color="#F6FF5F" className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Показать пароль</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </button>
        )}
        {endIcon ? endIcon : null}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
