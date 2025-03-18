import { useState } from "react";
import { Circle, Equal, Plus, X } from "lucide-react";
import { Control, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ExchangeRate, Currency } from "@/entities/direction";
import { DirectionAddSchemaType } from "@/entities/direction";
import { CustomFormField } from "../../custom-form-field";
import { VolumeInput } from "../../volumeInput/ui/volumeInput";

interface ExchangeRatesWithFromVolumesProps {
  control: Control<DirectionAddSchemaType>;
  form: UseFormReturn<DirectionAddSchemaType>;
  valuteFrom: Currency | null;
  valuteTo: Currency | null;
  exchangeRates: ExchangeRate[];
  onAddNewRate: () => void;
  onDeleteRate: (index: number) => void;
}

export const ExchangeRatesWithFromVolume = ({
  control,
  form,
  valuteFrom,
  valuteTo,
  exchangeRates,
  onAddNewRate,
  onDeleteRate,
}: ExchangeRatesWithFromVolumesProps) => {
  const { t } = useTranslation();
  const [infinityIndex, setInfinityIndex] = useState<number | null>(null);

  const handleVolumeChange = (index: number, field: "min_count" | "max_count", value: number) => {
    const rates = form.getValues("exchange_rates");
    
    if (!rates) return;
    
    if (field === "max_count" && index < rates.length - 1) {
      // Если изменяется max_count, обновляем min_count следующего рейта
      form.setValue(`exchange_rates.${index + 1}.min_count`, value);
    } else if (field === "min_count" && index > 0) {
      // Если изменяется min_count, обновляем max_count предыдущего рейта
      form.setValue(`exchange_rates.${index - 1}.max_count`, value);
    }
  };

  const handleAddNewRate = () => {
    setInfinityIndex(null);
    if (infinityIndex !== null) {
      form.setValue(`exchange_rates.${infinityIndex}.max_count`, 0);
    }
    onAddNewRate();
  };

  // Проверяем, есть ли пустые значения в последнем rate
  const lastRate = exchangeRates[exchangeRates.length - 1];
  const isEmptyValue = (value: number | null | undefined): boolean => {
    if (value === null || value === undefined) return true;
    const numValue = Number(value);
    return isNaN(numValue) || numValue === 0;
  };
  
  const hasEmptyValues = (exchangeRates.length > 1 && isEmptyValue(lastRate.min_count)) ||
                        isEmptyValue(lastRate.in_count) || 
                        isEmptyValue(lastRate.out_count);

  return (
    <div className="grid grid-flow-row gap-6">
      {exchangeRates.map((_, index) => (
        <div key={index} className="relative bg-slate-400/15 mobile:rounded-[25px] rounded-[15px] mobile:p-6 p-3">
          <div className="grid grid-flow-row gap-4">
            <div className="grid grid-flow-row gap-3 justify-items-center">
              <p className="leading-none font-bold uppercase text-[#fff] text-sm text-center">
                {t("Курс обмена")} {t("от")} {exchangeRates[index].min_count} ($):
              </p>
              <div className="grid grid-cols-[1fr,auto,1fr,1fr] mobile:gap-2 gap-1 items-center">
                <CustomFormField
                  control={control}
                  name={`exchange_rates.${index}.in_count`}
                  type="number"
                  disabled={!valuteFrom || !valuteTo}
                  startAdornment={
                    valuteFrom ? (
                      <img
                        src={valuteFrom.icon_url}
                        alt={`image ${valuteFrom.name}`}
                        width={32}
                        height={32}
                        className="mobile:w-[32px] mobile:h-[32px] w-[24px] h-[24px] absolute left-3 top-1/2 -translate-y-1/2 rounded-full overflow-hidden"
                      />
                    ) : (
                      <Circle
                        width={32}
                        height={32}
                        color="white"
                        className="mobile:w-[32px] mobile:h-[32px] w-[24px] h-[24px] absolute left-3 translate-y-2"
                      />
                    )
                  }
                />
                <div>
                  <Equal className="text-white" />
                </div>
                <CustomFormField
                  control={control}
                  name={`exchange_rates.${index}.out_count`}
                  type="number"
                  disabled={!valuteFrom || !valuteTo}
                  startAdornment={
                    valuteTo ? (
                      <img
                        src={valuteTo.icon_url}
                        alt={`image ${valuteTo.name}`}
                        width={32}
                        height={32}
                        className="mobile:w-[32px] mobile:h-[32px] w-[24px] h-[24px] absolute left-3 top-1/2 -translate-y-1/2 rounded-full overflow-hidden"
                      />
                    ) : (
                      <Circle
                        width={32}
                        height={32}
                        color="white"
                        className="mobile:w-[32px] mobile:h-[32px] w-[24px] h-[24px] absolute left-3 translate-y-2"
                      />
                    )
                  }
                />
                              <VolumeInput
                  control={control}
                  index={index}
                  field="min_count"
                  label={t("от")}
                  onValueChange={(value) => handleVolumeChange(index, "min_count", value)}
                />
              </div>
            </div>
          </div>
          {exchangeRates.length > 1 && (
            <button
              type="button"
              onClick={() => onDeleteRate(index)}
              className="absolute mobile:top-2.5 mobile:right-2.5 top-1.5 right-1.5 text-white/90 stroke-1 hover:text-red-500 transition-colors"
            >
              <X className="mobile:size-6 size-4" />
            </button>
          )}
        </div>
      ))}
      {exchangeRates.length < 4 && (
        <button
          type="button"
          onClick={handleAddNewRate}
          disabled={hasEmptyValues}
          className={`flex items-center justify-center gap-2 p-4 bg-darkGray h-mainHeight overflow-hidden rounded-[35px] border-none ${
            hasEmptyValues ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <Plus className="text-white" />
          <span className="text-white leading-none uppercase font-semibold text-sm">
            {t("Добавить ещё")}
          </span>
        </button>
      )}
    </div>
  );
}; 