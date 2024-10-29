import {
  DirectionAddSchemaType,
  directionAddSchema,
  useActualCourseQuery,
  useAddDirectionMutation,
  useAvailableValutesQuery,
} from "@/entities/direction";
import { ActualCourse } from "@/features/direction/actualCourse";
import { ItemSelect } from "@/features/itemSelect";
import { Lang } from "@/shared/config";
import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, Equal, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const DirectionAddForm = () => {
  const { i18n, t } = useTranslation();

  const form = useForm<DirectionAddSchemaType>({
    resolver: zodResolver(directionAddSchema),
    defaultValues: {
      getCurrency: undefined,
      giveCurrency: undefined,
      getCurrencyPrice: 0,
      giveCurrencyPrice: 0,
    },
  });
  const navigate = useNavigate();

  const activeCity = useAppSelector(
    (state) => state.activeCity.activeCity?.code_name || ""
  );

  form.watch(["giveCurrency", "getCurrency"]);

  const { toast } = useToast();

  const [addDirection, { isLoading: isLoadingAddDirection }] =
    useAddDirectionMutation();

  const { data: currencies } = useAvailableValutesQuery({ base: "all" });

  const { data: availableCurrencies } = useAvailableValutesQuery(
    { base: form.getValues("giveCurrency.code_name") },
    { skip: !form.getValues("giveCurrency.code_name") }
  );

  const currectAllCurrencies = Object.values(currencies || {}).flat();
  const currectAvailableCurrencies = Object.values(
    availableCurrencies || {}
  ).flat();

  const { data: actualCourse } = useActualCourseQuery(
    {
      valute_from: form.getValues("giveCurrency.code_name"),
      valute_to: form.getValues("getCurrency.code_name"),
    },
    {
      skip:
        !form.getValues("giveCurrency.code_name") ||
        !form.getValues("getCurrency.code_name"),
    }
  );

  const handleAddDirection = (
    in_count: number,
    out_count: number,
    data: DirectionAddSchemaType
  ) => {
    addDirection({
      city: activeCity,
      in_count,
      out_count,
      is_active: true,
      valute_from: data.giveCurrency?.code_name || "",
      valute_to: data.getCurrency?.code_name || "",
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
        } else {
          toast({
            title: t("Произошла ошибка на сервере, попробуйте позже..."),
            variant: "destructive",
          });
        }
      });
  };

  const onSubmit = (data: DirectionAddSchemaType) => {
    if (data.giveCurrencyPrice === data.getCurrencyPrice) {
      handleAddDirection(1, 1, data);
    } else if (data?.giveCurrencyPrice === 1 || data?.getCurrencyPrice === 1) {
      handleAddDirection(data?.giveCurrencyPrice, data?.getCurrencyPrice, data);
    } else if (data?.giveCurrencyPrice !== 1 || data?.getCurrencyPrice !== 1) {
      {
        const in_count =
          data.giveCurrencyPrice > data.getCurrencyPrice
            ? data.giveCurrencyPrice / data.getCurrencyPrice
            : 1;

        const out_count =
          data.giveCurrencyPrice > data.getCurrencyPrice
            ? 1
            : data.getCurrencyPrice / data.giveCurrencyPrice;

        handleAddDirection(in_count, out_count, data);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-flow-row grid-cols-1 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"giveCurrency"}
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
                    form.resetField("getCurrency");
                    form.resetField("getCurrencyPrice");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"getCurrency"}
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
                    field.value?.name?.[
                      i18n.language === Lang.ru ? Lang.ru : Lang.en
                    ] || ""
                  }
                  disabled={!form.getValues("giveCurrency")}
                  onClick={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActualCourse actualCourse={actualCourse} />
        <div className="grid grid-flow-row gap-10">
          <div>
            <div className="grid justify-center items-center pb-4 px-2">
              <p className="font-semibold uppercase text-[#fff] text-xs text-center">
                {t("Укажите свой курс в поле ниже")}
              </p>
            </div>
            <div className="grid grid-cols-[1fr,50px,1fr] items-center  grid-row-1">
              <FormField
                control={form.control}
                name={"giveCurrencyPrice"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="number"
                          disabled={
                            !form.getValues("giveCurrency") ||
                            !form.getValues("getCurrency")
                          }
                          startAdornment={
                            form.getValues("giveCurrency") ? (
                              <img
                                src={form.getValues("giveCurrency.icon_url")}
                                alt={`image ${form.getValues(
                                  "giveCurrency.name"
                                )}`}
                                width={32}
                                height={32}
                                className="absolute left-3 top-1/2 -translate-y-1/2  rounded-full overflow-hidden"
                              />
                            ) : (
                              <Circle
                                width={32}
                                height={32}
                                color="white"
                                className="absolute left-3 translate-y-2"
                              />
                            )
                          }
                          className=" bg-darkGray text-white text-base rounded-[35px] pl-12 min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0 "
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center">
                <Equal className="text-white " />
              </div>

              <FormField
                control={form.control}
                name={"getCurrencyPrice"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="number"
                          disabled={
                            !form.getValues("giveCurrency") ||
                            !form.getValues("getCurrency")
                          }
                          startAdornment={
                            form.getValues("getCurrency") ? (
                              <img
                                src={form.getValues("getCurrency.icon_url")}
                                alt={`image ${form.getValues(
                                  "getCurrency.name"
                                )}`}
                                width={32}
                                height={32}
                                className="absolute left-3 top-1/2 -translate-y-1/2  rounded-full overflow-hidden"
                              />
                            ) : (
                              <Circle
                                width={32}
                                height={32}
                                color="white"
                                className="absolute left-3 translate-y-2"
                              />
                            )
                          }
                          className="border text-base border-white bg-darkGray text-white  rounded-[35px] pl-12 min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
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
        <div></div>
      </form>
    </Form>
  );
};
