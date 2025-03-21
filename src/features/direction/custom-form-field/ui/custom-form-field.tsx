import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/shared/ui";
import { Control } from "react-hook-form";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  type?: string;
}

export const CustomFormField: React.FC<CustomFormFieldProps> = ({
  control,
  name,
  disabled = false,
  startAdornment,
  type = "text",
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              {startAdornment}
              <Input
                {...field}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                type={type}
                disabled={disabled}
                className="bg-darkGray text-white text-base rounded-[35px] mobile:pl-12 pl-10 mobile:min-h-12 min-h-10 focus-visible:ring-transparent focus-visible:ring-offset-0"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
