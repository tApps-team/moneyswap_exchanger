import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Direction,
  directionSchemaType,
  useDeleteDirectionMutation,
} from "@/entities/direction";
import { useToast } from "@/shared/ui/toast";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/model";
import { LocationMarker } from "@/shared/types";
import { AmountRange } from "./amountRange";
import { ExchangeRate } from "./exchangeRate";
import { BankomatsList } from "./bankomatsList";
import { DirectionControls } from "./directionControls";
import { LogoButtonIcon } from "@/shared/assets";

interface DirectionCardProps {
  direction: Direction;
  form: UseFormReturn<directionSchemaType>;
  index: number;
}

export const DirectionCard: FC<DirectionCardProps> = ({
  direction,
  form,
  index,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const calculateRateCoefficient = (rate: { in_count: number; out_count: number }, baseRate: { in_count: number; out_count: number }): number => {
    if (!baseRate) return 1;
    if (baseRate.in_count === 0 || baseRate.out_count === 0) return 1;

    if (rate.in_count > rate.out_count) {
      return rate.in_count / baseRate.in_count;
    }
    
    return rate.out_count / baseRate.out_count;
  };

  const [deleteDirection] = useDeleteDirectionMutation();
  const activeLocation = useAppSelector(
    (state) => state.activeLocation.activeLocation
  );

  const isActive = form.watch(`directions.${index}.is_active`);
  const exchangeRates = form.watch(`directions.${index}.exchange_rates`);

  const handleDelete = () => {
    if (activeLocation) {
      deleteDirection({
        id: activeLocation?.id,
        direction_id: direction.id,
        marker: activeLocation?.code_name
          ? LocationMarker.city
          : LocationMarker.country,
      })
        .unwrap()
        .then(() => {
          toast({
            title: t("Направлениe успешно удалено"),
            description: "",
            variant: "success",
          });
        })
        .catch((error) => console.error("Ошибка...,", error));
    }
  };

  const handleBaseRateChange = (value: number, isInCount: boolean) => {
    const rates = form.getValues(`directions.${index}.exchange_rates`);
    if (!rates) return;

    // Обновляем значение базового курса
    const basePath = `directions.${index}.exchange_rates.0` as const;
    form.setValue(
      isInCount 
        ? `${basePath}.in_count` as const
        : `${basePath}.out_count` as const, 
      value
    );

    // Если есть дополнительные курсы, обновляем их
    if (rates.length > 1) {
      const baseRate = rates[0];
      const isBaseInCountGreater = baseRate.in_count > baseRate.out_count;

      // Пересчитываем все остальные курсы
      rates.slice(1).forEach((rate, idx) => {
        const ratePath = `directions.${index}.exchange_rates.${idx + 1}` as const;
        const rateCoefficient = rate.rate_coefficient ?? 1;

        // Пересчитываем только in_count если базовый in_count больше out_count
        // Или только out_count если базовый out_count больше in_count
        if (isBaseInCountGreater && isInCount) {
          const newValue = value * rateCoefficient;
          form.setValue(`${ratePath}.in_count` as const, newValue);
        } else if (!isBaseInCountGreater && !isInCount) {
          const newValue = value * rateCoefficient;
          form.setValue(`${ratePath}.out_count` as const, newValue);
        }
      });
    }

    form.trigger();
  };

  const handleRateChange = (value: number, isInCount: boolean, rateIndex: number) => {
    const rates = form.getValues(`directions.${index}.exchange_rates`);
    if (!rates || rateIndex === 0) return;

    const ratePath = `directions.${index}.exchange_rates.${rateIndex}` as const;
    
    // Обновляем значение курса
    form.setValue(
      isInCount 
        ? `${ratePath}.in_count` as const
        : `${ratePath}.out_count` as const, 
      value
    );

    // Пересчитываем rate_coefficient
    const baseRate = rates[0];
    const currentRate = {
      in_count: isInCount ? value : rates[rateIndex].in_count,
      out_count: isInCount ? rates[rateIndex].out_count : value
    };
    
    const newRateCoefficient = calculateRateCoefficient(currentRate, baseRate);
    form.setValue(`${ratePath}.rate_coefficient` as const, newRateCoefficient);

    form.trigger();
  };

  return (
    <div
      className={`h-[150px] rounded-[25px] grid gap-[30px] p-[20px] pb-[10px] ${!isActive ? "bg-lightGray" : "bg-mainColor"}`}
      style={{ height: (!exchangeRates || exchangeRates.length <= 1) ? "150px" : "auto" }}
    >
      <div className="grid grid-cols-[1fr,min-content,1fr] mobile:gap-[20px] gap-[10px] items-center justify-between">
        <div className="grid grid-cols-[34px,1fr] mobile:gap-[10px] gap-[5px] relative">
          <div className="rounded-full overflow-hidden">
            <img
              src={direction.icon_valute_from}
              className="w-[34px] h-[34px]"
            />
          </div>
          <FormField
            control={form.control}
            name={`directions.${index}.exchange_rates.0.in_count`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="number"
                    className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      handleBaseRateChange(value, true);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="absolute left-0 text-sm bottom-[-25px] font-normal max-w-full whitespace-nowrap overflow-hidden text-ellipsis font_unbounded">
            {direction?.valute_from}
          </p>
        </div>
        <span className="text-xl">=</span>
        <div className="grid grid-cols-[34px,1fr] mobile:gap-[10px] gap-[5px] relative">
          <div className="rounded-full overflow-hidden">
            <img src={direction?.icon_valute_to} className="w-[34px] h-[34px]" />
          </div>
          <FormField
            control={form.control}
            name={`directions.${index}.exchange_rates.0.out_count`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="number"
                    className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      handleBaseRateChange(value, false);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="absolute left-0 text-sm bottom-[-25px] font-normal max-w-full whitespace-nowrap overflow-hidden text-ellipsis font_unbounded">
            {direction?.valute_to}
          </p>
          <BankomatsList bankomats={direction.bankomats || []} />
        </div>
      </div>

      {exchangeRates && exchangeRates.length > 1 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="rates" className="border-2 border-transparent data-[state=open]:border-gray-300/40 bg-darkGray data-[state=open]:bg-lightGray/70 rounded-[25px] transition-all duration-300 shadow-inner mt-4">
            <AccordionTrigger className="rounded-full px-4 py-2 hover:no-underline [&>svg]:hidden group">
              <div className="flex items-center gap-2">
                <span className="group-data-[state=open]:text-black text-white uppercase font-semibold text-sm">{t("Суммы и курсы")}</span>
                <LogoButtonIcon className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 fill-white group-data-[state=open]:fill-[#000]" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="mobile:px-4 px-2 pb-4 pt-0 grid grid-flow-row gap-4">
                <div className="grid grid-flow-col justify-center items-center gap-4">
                  {/* <span className="font-semibold text-sm text-black">{t("Сумма")}:</span> */}
                  <AmountRange form={form} index={index} rateIndex={0} />
                </div>
                {exchangeRates.slice(1).map((rate, rateIndex) => (
                  <div key={rateIndex + 1} className="grid grid-flow-row gap-1 items-center">
                    <div className="grid grid-flow-row gap-1">
                      <ExchangeRate
                        form={form}
                        index={index}
                        rateIndex={rateIndex + 1}
                        direction={direction}
                        onRateChange={handleRateChange}
                      />
                      <div className="flex items-center gap-4">
                        {/* <span className="font-semibold text-sm text-black">{t("Сумма")}:</span> */}
                        <AmountRange 
                          form={form} 
                          index={index} 
                          rateIndex={rateIndex + 1} 
                          isLast={rateIndex + 1 === exchangeRates.length - 1}
                        />
                      </div>
                    </div>
                    <div className="font-semibold text-sm text-black text-center">
                    Коэффициент:{" "}
                      {rate.rate_coefficient}
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <DirectionControls
        form={form}
        index={index}
        isActive={isActive}
        onDelete={handleDelete}
      />
    </div>
  );
};
