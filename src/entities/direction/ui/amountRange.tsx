import { Infinity } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { directionSchemaType } from "@/entities/direction";
import { LogoButtonIcon } from "@/shared/assets";
import { useTranslation } from "react-i18next";

interface AmountRangeProps {
  form: UseFormReturn<directionSchemaType>;
  index: number;
  rateIndex: number;
  isLast?: boolean;
}

export const AmountRange: React.FC<AmountRangeProps> = ({
  form,
  index,
  rateIndex,
  isLast,
}) => {
  const { t } = useTranslation();

  const handleMaxCountChange = (value: number) => {
    // Обновляем max_count текущего rate
    form.setValue(`directions.${index}.exchange_rates.${rateIndex}.max_count`, value);

    // Если это не последний rate, обновляем min_count следующего rate
    if (!isLast) {
      form.setValue(`directions.${index}.exchange_rates.${rateIndex + 1}.min_count`, value);
    }
  };

  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center justify-stretch justify-items-stretch">
      <div className="relative">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm ${rateIndex === 0 ? "text-black/50" : "text-white/50"}`}>
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
                  className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-10"
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
      <div>
        <LogoButtonIcon fill="#000" className="size-4 -rotate-90"/>
      </div>
      <div className="relative">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm ${isLast ? "text-black/50" : "text-white/50"}`}>
          {t("до")}:
        </span>
        <FormField
          control={form.control}
          name={`directions.${index}.exchange_rates.${rateIndex}.max_count`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  type="number"
                  className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-10"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  disabled={isLast}
                  onChange={(e) => {
                    const value = e.target.value === "" ? 0 : Number(e.target.value);
                    handleMaxCountChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLast && (
          <button
            type="button"
            className="absolute right-7 top-1/2 -translate-y-1/2"
          >
            <Infinity className="size-4 text-white/50" />
          </button>
        )}
      </div>
    </div>
  );
}; 