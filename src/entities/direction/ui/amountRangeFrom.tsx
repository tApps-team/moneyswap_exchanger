import { FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { directionSchemaType } from "@/entities/direction";
import { useTranslation } from "react-i18next";

interface AmountRangeFromProps {
  form: UseFormReturn<directionSchemaType>;
  index: number;
  rateIndex: number;
}

export const AmountRangeFrom: React.FC<AmountRangeFromProps> = ({
  form,
  index,
  rateIndex,
}) => {
  const { t } = useTranslation();

  return (
      <div className="relative">
        <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 font-semibold text-sm ${rateIndex === 0 ? "text-black/50" : "text-white/50"}`}>
          {t("от")}:
        </span>
        <FormField
          control={form.control}
          name={`directions.${index}.exchange_rates.${rateIndex}.min_count`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={rateIndex === 0 ? 0 : (field.value || "")}
                  type="number"
                  className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-8"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  disabled={rateIndex === 0}
                  onChange={(e) => {
                    const value = e.target.value === "" ? 0 : Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
  );
}; 