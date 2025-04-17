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
    useToast
  } from "@/shared/ui";
  import { FC } from "react";
  import { UseFormReturn } from "react-hook-form";
  import {
    Direction,
    directionSchemaType,
    useDeleteDirectionMutation,
  } from "@/entities/direction";
  import { useTranslation } from "react-i18next";
  import { useAppSelector } from "@/shared/model";
  import { LocationMarker } from "@/shared/types";
  import { AmountRangeFrom, ExchangeRate, BankomatsList, DirectionControls } from "./components";
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

    const {activeLocation, nonCash} = useAppSelector(
      (state) => state.activeLocation
    );
  
    const isActive = form.watch(`directions.${index}.is_active`);
    const exchangeRates = form.watch(`directions.${index}.exchange_rates`);
  
    const handleDelete = () => {
      const requestData = {
        direction_id: direction.id,
      }

      const deletePromise = nonCash
      ? deleteDirection({...requestData, marker: LocationMarker.no_cash})
      : activeLocation && deleteDirection({
        ...requestData,
        id: activeLocation.id,
        marker: activeLocation.code_name
          ? LocationMarker.city
          : LocationMarker.country,
      });

      deletePromise && deletePromise
          .unwrap()
          .then(() => {
            toast({
              title: t("Направлениe успешно удалено"),
              description: "",
              variant: "success",
            });
          })
          .catch((error) => console.error("Ошибка...,", error));
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
        <div className={`grid ${exchangeRates && exchangeRates.length > 1 ? "grid-cols-[1fr,min-content,1fr,0.8fr]" : "grid-cols-[1fr,min-content,1fr]"} items-center justify-between mobile:gap-[10px] gap-[5px]`}>
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
          {exchangeRates && exchangeRates.length > 1 && <AmountRangeFrom form={form} index={index} rateIndex={0} />}
        </div>
  
        {exchangeRates && exchangeRates.length > 1 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="rates" className="border-b-0 bg-darkGray data-[state=open]:bg-white/50 rounded-[15px] transition-all duration-300 shadow-[inset_2px_2px_10px_1px_rgba(0,0,0,0.25)] mt-4">
              <AccordionTrigger className="rounded-[15px] px-4 py-2 hover:no-underline [&>svg]:hidden group data-[state=open]:bg-darkGray">
                <div className="flex items-center gap-2">
                  <span className="group-data-[state=open]:text-mainColor text-white uppercase mobile:font-semibold font-medium text-sm">{t("Суммы и курсы")}</span>
                  <LogoButtonIcon className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 fill-white group-data-[state=open]:fill-mainColor" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="mobile:px-4 px-2 py-4 grid grid-flow-row gap-4">
                  {exchangeRates.slice(1).map((rate, rateIndex) => (
                    <div key={rateIndex + 1} className="grid grid-flow-row mobile:gap-4 gap-2 items-center">
                      <div className="grid mobile:grid-cols-[1fr,0.5fr] grid-cols-[1fr,0.4fr] mobile:gap-2 gap-1">
                        <ExchangeRate
                          form={form}
                          index={index}
                          rateIndex={rateIndex + 1}
                          direction={direction}
                          onRateChange={handleRateChange}
                        />
                          <AmountRangeFrom 
                            form={form} 
                            index={index} 
                            rateIndex={rateIndex + 1} 
                          />
                      </div>
                      <div className="grid grid-cols-[0.42fr,1fr] mobile:gap-2 gap-1 items-center justify-stretch justify-items-center">
                        <FormField
                          control={form.control}
                          name={`directions.${index}.exchange_rates.${rateIndex + 1}.rate_coefficient`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  step="any"
                                  value={field.value ?? ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value === "" ? null : Number(value));
                                    if (value !== '') {
                                      const coefficient = parseFloat(value);
                                      if (!isNaN(coefficient) && isFinite(coefficient)) {
                                        const baseRate = exchangeRates[0];
                                        if (baseRate.in_count > baseRate.out_count) {
                                          const newInCount = baseRate.in_count * coefficient;
                                          if (isFinite(newInCount)) {
                                            form.setValue(`directions.${index}.exchange_rates.${rateIndex + 1}.in_count`, newInCount);
                                          }
                                        } else {
                                          const newOutCount = baseRate.out_count * coefficient;
                                          if (isFinite(newOutCount)) {
                                            form.setValue(`directions.${index}.exchange_rates.${rateIndex + 1}.out_count`, newOutCount);
                                          }
                                        }
                                      }
                                    }
                                  }}
                                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                  className="bg-darkGray text-white text-base rounded-[35px] mobile:min-h-12 min-h-10 focus-visible:ring-transparent focus-visible:ring-offset-0 text-center w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <p className="text-black text-sm font-medium w-full">
                          {t("rate_coefficient")}
                        </p>
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
  