import { FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { LogoArrowIcon } from "@/shared/assets";
import { Control, FieldValues, Path } from "react-hook-form";

interface MinMaxAmountProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
  t: (key: string) => string;
}

export const MinMaxAmount = <T extends FieldValues & { min_amount?: number | null; max_amount?: number | null }>({ 
  control, 
  disabled, 
  t 
}: MinMaxAmountProps<T>) => {
  return (
    <div>
      <div className="grid justify-center items-center pb-4 px-2">
        <p className="font-semibold uppercase text-[#fff] text-xs text-center">
          {t("Минимальная и максимальная сумма")}
        </p>
      </div>
      <div className="grid grid-cols-[1fr,50px,1fr] items-center grid-row-1">
        <FormField
          control={control}
          name={"min_amount" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="number"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    className="bg-darkGray text-white text-base rounded-[35px] min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    disabled={disabled}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? null
                          : Number(e.target.value)
                      )
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center text-white font-extrabold">
          <LogoArrowIcon className="rotate-180" />
        </div>

        <FormField
          control={control}
          name={"max_amount" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="number"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    className="bg-darkGray text-white text-base rounded-[35px] min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    disabled={disabled}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? null
                          : Number(e.target.value)
                      )
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
