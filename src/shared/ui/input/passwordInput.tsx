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

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 " />
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-12 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Eye className="h-4 w-4 cursor-pointer" />
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
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Показать пароль</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </button>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
