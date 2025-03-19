import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, Equal, Loader, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ActualCourse, CustomFormField, ExchangeRatesWithVolumes, ExchangeRatesWithFromVolume } from "@/features/direction";
import {
  DirectionAddSchemaType,
  ExchangeRate,
  directionAddSchema,
  useActualCourseQuery,
  useAddDirectionMutation,
  useAvailableValutesQuery,
  useGetBankomatsByValuteQuery,
} from "@/entities/direction";
import { ItemSelect } from "@/features/itemSelect";
import { LogoButtonIcon } from "@/shared/assets";
import { Lang } from "@/shared/config";
import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";
import { CurrencyType, LocationMarker } from "@/shared/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem, 
  AccordionTrigger,
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/toast";

export const DirectionAddForm = () => {
  const { i18n, t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const currentLanguage = i18n.language as "ru" | "en";
  const activeLocation = useAppSelector(
    (state) => state.activeLocation?.activeLocation || null
  );

  const form = useForm<DirectionAddSchemaType>({
    resolver: zodResolver(directionAddSchema),
    defaultValues: {
      valute_from: null,
      valute_to: null,
      bankomats: null,
      is_active: true,
      exchange_rates: [
        { min_count: 0, max_count: 0, in_count: 0, out_count: 0, rate_coefficient: 1 },
      ],
      is_exchange_rates: false,
    },
  });

  form.watch([
    "valute_from",
    "valute_to",
    "bankomats",
    "is_exchange_rates",
    "exchange_rates",
  ]);

  const [addDirection, { isLoading: isLoadingAddDirection }] =
    useAddDirectionMutation();

  const { data: currencies } = useAvailableValutesQuery({ base: "all" });

  const { data: availableCurrencies } = useAvailableValutesQuery(
    { base: form.getValues("valute_from.code_name") },
    { skip: !form.getValues("valute_from.code_name") }
  );

  const currectAllCurrencies = useMemo(
    () =>
      currencies
        ?.flatMap((currency) => currency.currencies)
        .sort((a, b) =>
          a.name[currentLanguage] > b.name[currentLanguage]
            ? 1
            : a.name[currentLanguage] < b.name[currentLanguage]
            ? -1
            : 0
        ),
    [currencies, currentLanguage]
  );

  const currectAvailableCurrencies = useMemo(
    () =>
      availableCurrencies
        ?.flatMap((currency) => currency.currencies)
        .sort((a, b) =>
          a.name[currentLanguage] > b.name[currentLanguage]
            ? 1
            : a.name[currentLanguage] < b.name[currentLanguage]
            ? -1
            : 0
        ),
    [availableCurrencies, currentLanguage]
  );

  const {
    data: bankomats,
    refetch,
    isLoading: isBankomatsLoading,
    isFetching: isBankomatsFetching,
  } = useGetBankomatsByValuteQuery(
    {
      valute: form.getValues("valute_to.name.ru"),
    },
    {
      skip:
        !form.getValues("valute_to.code_name") ||
        form.getValues("valute_to.type_valute") !== CurrencyType.Bankomat,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (form.getValues("valute_to.type_valute") === CurrencyType.Bankomat) {
      refetch();
      bankomats && form.setValue("bankomats", bankomats);
    }
  }, [form.getValues("valute_to.type_valute")]);

  useEffect(() => {
    if (bankomats && bankomats.length > 0) {
      form.setValue("bankomats", bankomats);
    }
  }, [bankomats]);

  const { data: actualCourse } = useActualCourseQuery(
    {
      valute_from: form.getValues("valute_from.code_name"),
      valute_to: form.getValues("valute_to.code_name"),
    },
    {
      skip:
        !form.getValues("valute_from.code_name") ||
        !form.getValues("valute_to.code_name"),
    }
  );

  const handleAddDirection = (data: DirectionAddSchemaType) => {
    if (activeLocation) {
      const currentBankomats =
        form.getValues("bankomats")?.map((bank) => ({
          id: bank.id,
          available: bank.available,
        })) || null;
      addDirection({
        id: activeLocation?.id,
        marker: activeLocation?.code_name
          ? LocationMarker.city
          : LocationMarker.country,
        is_active: true,
        valute_from: data.valute_from?.code_name || "",
        valute_to: data.valute_to?.code_name || "",
        bankomats:
          form.getValues("valute_to.type_valute") === CurrencyType.Bankomat
            ? currentBankomats
            : null,
        exchange_rates: data.exchange_rates || [],
      })
        .unwrap()
        .then(() => {
          navigate(paths.home);
          toast({
            title: t("Направление успешно добалено"),
            variant: "success",
          });
        })
        .catch((error) => {
          if (error.status === 423) {
            toast({
              title: t("Такое направление уже добавлено!"),
              variant: "destructive",
            });
          } else if (error.status === 424) {
            toast({
              title: t(
                "Такое направление уже существует на уровне партнерской страны"
              ),
              description: t(
                "Чтобы добавить это направление в этом городе, удалите это направление в карточке страны"
              ),
              variant: "destructive",
            });
          } else {
            toast({
              title: t("Произошла ошибка на сервере, попробуйте позже..."),
              variant: "destructive",
            });
          }
        });
    }
  };

  const onSubmit = (data: DirectionAddSchemaType) => {
    // Если is_exchange_rates false, оставляем только первый объект
    const ratesToProcess = data.is_exchange_rates 
      ? data.exchange_rates 
      : data.exchange_rates?.slice(0, 1);

    const updatedExchangeRates =
      ratesToProcess?.map((rate: ExchangeRate, index: number, array: ExchangeRate[]) => {
        let in_count: number = rate.in_count ?? 1;
        let out_count: number = rate.out_count ?? 1;

        if (rate.in_count === rate.out_count) {
          in_count = 1;
          out_count = 1;
        } else if (rate.in_count === 1 || rate.out_count === 1) {
          in_count = rate.in_count;
          out_count = rate.out_count;
        } else if (rate.in_count !== 1 || rate.out_count !== 1) {
          in_count =
            rate.in_count > rate.out_count
              ? rate.in_count / rate.out_count
              : 1;

          out_count =
            rate.in_count > rate.out_count
              ? 1
              : rate.out_count / rate.in_count;
        }

        // Если в массиве только один элемент, делаем min_count и max_count null
        if (array.length === 1) {
          return { ...rate, in_count, out_count, min_count: null, max_count: null };
        }

        if (index === array.length - 1) {
          return { ...rate, in_count, out_count, max_count: null };
        }

        return { ...rate, in_count, out_count };
      }) ?? null;

    // Обновляем объект data с новыми значениями exchange_rates
    const updatedData = { ...data, exchange_rates: updatedExchangeRates };

    handleAddDirection(updatedData);
  };

  const handleAddNewRate = () => {
    const currentRates = form.getValues("exchange_rates") || [];
    const lastRate = currentRates[currentRates.length - 1];
    
    form.setValue("exchange_rates", [
      ...currentRates,
      {
        min_count: lastRate?.max_count || 0,
        max_count: 0,
        in_count: lastRate.in_count,
        out_count: lastRate.out_count,
        rate_coefficient: 1,
      },
    ]);
  };

  const handleDeleteRate = (index: number) => {
    const currentRates = form.getValues("exchange_rates") || [];
    const updatedRates = currentRates.filter((_, i) => i !== index);
    
    // Если удалили первый rate, сбрасываем min_count в 0 для нового первого rate
    if (index === 0 && updatedRates.length > 0) {
      updatedRates[0] = {
        ...updatedRates[0],
        min_count: 0
      };
    }
    
    form.setValue("exchange_rates", updatedRates);
  };

  // console.log(form.formState.errors);

  const isFirstVariant = false

  return (
    <Form {...form}>
      <form
        className="grid grid-flow-row grid-cols-1 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"valute_from"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-lg font-medium sm:text-xl uppercase">
                {t("Отдаю")}
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel={t("Отдаю")}
                  inputPlaceholder={t("Поиск валюты")}
                  emptyLabel={t("Выберите валюту")}
                  itemIcon={field.value?.icon_url}
                  items={currectAllCurrencies}
                  label={
                    field.value
                      ? `${field.value?.code_name} (${
                          field.value?.name?.[
                            i18n.language === Lang.ru ? Lang.ru : Lang.en
                          ]
                        })`
                      : ""
                  }
                  onClick={(e) => {
                    field.onChange(e);
                    form.resetField("valute_to");
                    form.resetField("exchange_rates");
                    form.setValue("bankomats", null);
                  }}
                  isCurrency
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"valute_to"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-lg font-medium sm:text-xl uppercase">
                {t("Получаю")}
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel={t("Получаю")}
                  inputPlaceholder={t("Поиск валюты")}
                  items={currectAvailableCurrencies}
                  itemIcon={field.value?.icon_url}
                  emptyLabel={t("Выберите валюту")}
                  label={
                    field.value
                      ? `${field.value?.code_name} (${
                          field.value?.name?.[
                            i18n.language === Lang.ru ? Lang.ru : Lang.en
                          ]
                        })`
                      : ""
                  }
                  disabled={!form.getValues("valute_from")}
                  onClick={(e) => {
                    field.onChange(e);
                    if (e.type_valute !== CurrencyType.Bankomat) {
                      form.setValue("bankomats", null);
                    }
                  }}
                  isCurrency
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* банкоматы */}
        {form.getValues("bankomats") &&
          form.getValues("bankomats")?.length &&
          !isBankomatsLoading &&
          !isBankomatsFetching && (
            <div className="grid grid-flow-row gap-6">
              <p className="font-normal uppercase text-white mobile:text-sm text-xs text-center">
                {t("Укажите какие банкоматы поддерживаете для")}{" "}
                <span className="font-semibold">
                  {i18n.language === Lang.ru
                    ? form.getValues(`valute_to.name.ru`)
                    : i18n.language === Lang.en &&
                      form.getValues(`valute_to.name.en`)}
                  :
                </span>
              </p>
              <Accordion
                type="single"
                collapsible
                className="w-full bg-black/30 backdrop-blur-2xl rounded-[35px] shadow-[1px_2px_8px_1px_rgba(0,0,0,0.6)]"
              >
                <AccordionItem value="accordion" className="border-b-0">
                  <AccordionTrigger className="uppercase text-white font-medium mobile:h-mainHeight h-[60px] mobile:text-sm text-xs">
                    {t("Доступные банкоматы")} (
                    {form.getValues("bankomats")?.length})
                  </AccordionTrigger>
                  <AccordionContent className="mobile:px-6 px-4 pb-6 grid grid-flow-row gap-4 justify-start items-center text-sm">
                    {form.getValues("bankomats")?.map((bank, index) => (
                      <FormField
                        key={bank?.id}
                        control={form.control}
                        name={`bankomats.${index}.available`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-row items-center gap-4">
                                <Checkbox
                                  id={bank?.name}
                                  checked={field.value}
                                  onCheckedChange={(value) =>
                                    field.onChange(value)
                                  }
                                />
                                <div className="flex flex-row gap-2 items-center">
                                  <img
                                    src={bank?.icon}
                                    alt="icon"
                                    className="w-6 h-6 rounded-full overflow-hidden"
                                  />
                                  <label
                                    htmlFor={bank?.name}
                                    className="text-white font-medium uppercase mobile:text-sm text-xs peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {bank?.name}
                                  </label>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        {(isBankomatsLoading || isBankomatsFetching) && (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin" stroke="#fff" />
          </div>
        )}
        {/* банкоматы */}
        <ActualCourse actualCourse={actualCourse} />
        {form.getValues("is_exchange_rates") ? (
          <div className="grid grid-flow-row gap-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => form.setValue("is_exchange_rates", false)}
                className="rounded-full bg-darkGray p-2"
              >
                <X className="w-6 h-6" stroke="#fff" />
              </button>
            </div>
            {isFirstVariant ?             <ExchangeRatesWithVolumes
              control={form.control}
              form={form}
              valuteFrom={form.getValues("valute_from")}
              valuteTo={form.getValues("valute_to")}
              exchangeRates={form.getValues("exchange_rates") || []}
              onAddNewRate={handleAddNewRate}
              onDeleteRate={handleDeleteRate}
            /> :             <ExchangeRatesWithFromVolume
            control={form.control}
            form={form}
            valuteFrom={form.getValues("valute_from")}
            valuteTo={form.getValues("valute_to")}
            exchangeRates={form.getValues("exchange_rates") || []}
            onAddNewRate={handleAddNewRate}
            onDeleteRate={handleDeleteRate}
          />}
          </div>
        ) : (
          <div className="grid grid-flow-row gap-10">
            <div className="grid grid-flow-row gap-4">
              <div className="grid justify-center items-center">
                <p className="font-semibold uppercase text-[#fff] text-xs text-center">
                  {t("Укажите свой курс в поле ниже")}
                </p>
              </div>
              <div className="grid grid-cols-[1fr,50px,1fr] items-center grid-row-1">
                <CustomFormField
                  control={form.control}
                  name={"exchange_rates.0.in_count"}
                  type="number"
                  disabled={
                    !form.getValues("valute_from") ||
                    !form.getValues("valute_to")
                  }
                  startAdornment={
                    form.getValues("valute_from") ? (
                      <img
                        src={form.getValues("valute_from.icon_url")}
                        alt={`image ${form.getValues("valute_from.name")}`}
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
                <div className="flex items-center justify-center">
                  <Equal className="text-white" />
                </div>
                <CustomFormField
                  control={form.control}
                  name={"exchange_rates.0.out_count"}
                  type="number"
                  disabled={
                    !form.getValues("valute_from") ||
                    !form.getValues("valute_to")
                  }
                  startAdornment={
                    form.getValues("valute_to") ? (
                      <img
                        src={form.getValues("valute_to.icon_url")}
                        alt={`image ${form.getValues("valute_to.name")}`}
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
              </div>
            </div>
            <div
              onClick={() => form.setValue("is_exchange_rates", true)}
              className={`grid grid-cols-[1fr,auto] items-center justify-center justify-items-center gap-2 p-4 bg-darkGray h-mainHeight overflow-hidden rounded-[35px] border-none cursor-pointer ${(!form.getValues("valute_from") ||
                !form.getValues("valute_to")) && "opacity-50 cursor-not-allowed"}`}
            >
              <p className="text-white leading-none uppercase font-semibold mobile:text-sm text-xs">
                {t("depends_volumes")}
              </p>
              <div className="w-[28px] h-[28px]">
                <LogoButtonIcon fill="#F6FF5F" width={28} height={28} />
              </div>
            </div>
          </div>
        )}
        <Button
          className="rounded-[35px] border border-bg-darkGray text-lg  sm:text-xl h-[70px] bg-darkGray text-mainColor uppercase"
          type="submit"
        >
          {isLoadingAddDirection ? (
            <Loader className="animate-spin" />
          ) : (
            t("Добавить")
          )}
        </Button>
      </form>
    </Form>
  );
};
