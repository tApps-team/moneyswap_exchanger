import { FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { directionSchemaType } from "@/entities/direction";
import { Direction } from "@/entities/direction";

interface ExchangeRateProps {
  form: UseFormReturn<directionSchemaType>;
  index: number;
  rateIndex: number;
  direction: Direction;
  onRateChange: (value: number, isInCount: boolean, rateIndex: number) => void;
}

export const ExchangeRate: React.FC<ExchangeRateProps> = ({
  form,
  index,
  rateIndex,
  direction,
  onRateChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center mobile:gap-2 gap-1">
        <FormField
          control={form.control}
          name={`directions.${index}.exchange_rates.${rateIndex}.in_count`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <img 
                    src={direction.icon_valute_from} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-5"
                  />
                  <Input
                    {...field}
                    disabled={field.value === 1 && form.getValues(`directions.${index}.exchange_rates.0.out_count`) !== 1}
                    value={field.value || ""}
                    type="number"
                    className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-8"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      onRateChange(value, true, rateIndex);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="text-xl leading-none font-semibold">=</span>
        <FormField
          control={form.control}
          name={`directions.${index}.exchange_rates.${rateIndex}.out_count`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <img 
                    src={direction.icon_valute_to} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-5"
                  />
                  <Input
                    {...field}
                    disabled={field.value === 1 && form.getValues(`directions.${index}.exchange_rates.0.in_count`) !== 1}
                    value={field.value || ""}
                    type="number"
                    className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-8"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      onRateChange(value, false, rateIndex);
                    }}
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