import {
  LocationSchemaType,
  locationSchema,
  useAddPartnerCityMutation,
  useAddPartnerCountryMutation,
  useAllCountriesQuery,
  useCitiesByCountryNameQuery,
} from "@/entities/location";
import { ItemSelect } from "@/features/itemSelect";
import { LogoArrowIcon, LogoButtonIcon } from "@/shared/assets";
import { Lang } from "@/shared/config";
import { paths } from "@/shared/routing";
import { AllCitiesFlag } from "@/shared/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
  OptionsTimepicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
  TimePicker,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const LocationAddForm = () => {
  const { i18n, t } = useTranslation();
  const form = useForm<LocationSchemaType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: undefined,
      deliviry: false,
      office: false,
      weekdays: {
        time_from: "00:00",
        time_to: "00:00",
      },
      weekends: {
        time_from: "00:00",
        time_to: "00:00",
      },
      workDays: {
        ПН: true,
        ВТ: true,
        СР: true,
        ЧТ: true,
        ПТ: true,
        СБ: true,
        ВС: true,
      },
      min_amount: null,
      max_amount: null,
    },
  });

  const navigate = useNavigate();

  const { toast } = useToast();

  const [addPartnerCity, { isLoading: isLoadingAddPartnerCity }] =
    useAddPartnerCityMutation();
  const [addPartnerCountry, { isLoading: isLoadingAddPartnerCountry }] =
    useAddPartnerCountryMutation();

  const onSubmit = (data: LocationSchemaType) => {
    const req = {
      delivery: data?.deliviry,
      office: data?.office,
      weekdays: {
        time_from: data?.weekdays?.time_from,
        time_to: data?.weekdays?.time_to,
      },
      weekends: {
        time_from: data?.weekends?.time_from,
        time_to: data?.weekends?.time_to,
      },
      working_days: data?.workDays,
      min_amount: data?.min_amount || null,
      max_amount: data?.max_amount || null,
      ...(data?.location?.code_name === AllCitiesFlag
        ? { country_id: data.location.country_id }
        : { city: data.location.code_name }),
    };

    if (data?.location?.code_name === AllCitiesFlag) {
      addPartnerCountry(req)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("Успешно обновленно!"),
          });
          navigate(paths.home);
        })
        .catch((err) => {
          if (err.status === 423) {
            toast({
              title: t("Такой город уже существует"),
              description: t("Измените город!"),
              variant: "destructive",
            });
          } else {
            toast({
              title: t("Произошла ошибка на сервере, попробуйте позже..."),
              variant: "destructive",
            });
          }
        });
    } else {
      addPartnerCity(req)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("Успешно обновленно!"),
          });
          navigate(paths.home);
        })
        .catch((err) => {
          if (err.status === 423) {
            toast({
              title: t("Такой город уже существует"),
              description: t("Измените город!"),
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

  const formState = form.watch();

  const { data: countries } = useAllCountriesQuery();
  const { data: cities } = useCitiesByCountryNameQuery(
    {
      country_name: form.getValues("location.country.ru"),
    },
    { skip: !form.getValues("location.country.ru") }
  );

  return (
    <Form {...form}>
      <form
        className="grid grid-flow-row grid-cols-1 gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"location"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-lg font-medium sm:text-xl uppercase">
                {t("Страна")}
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel={t("Выбор страны")}
                  emptyLabel={t("Выберите страну")}
                  itemIcon={field.value?.country_flag}
                  inputPlaceholder={t("Поиск страны")}
                  items={countries}
                  label={
                    field.value?.country?.[
                      i18n.language === Lang.ru ? Lang.ru : Lang.en
                    ] || ""
                  }
                  onClick={(e) => {
                    field.onChange({
                      country: e.name,
                      country_flag: e.country_flag,
                      country_id: e.id,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"location"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor font-medium text-lg sm:text-xl uppercase">
                {t("Город")}
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel={t("Выбор города")}
                  disabled={!form.getValues("location.country")}
                  onClick={(e) => {
                    field.onChange({
                      ...formState.location,
                      name: e.name,
                      id: e.id,
                      code_name: e.code_name,
                    });
                  }}
                  items={cities || []}
                  inputPlaceholder={t("Поиск города")}
                  label={
                    field.value?.name?.[
                      i18n.language === Lang.ru ? Lang.ru : Lang.en
                    ]
                  }
                  emptyLabel={t("Выберите город")}
                  isAllCitiesBtn
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"deliviry"}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="text-white text-lg sm:text-xl uppercase">
                {t("Доставка")}
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"office"}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="text-white text-lg sm:text-xl uppercase">
                {t("Есть офис")}
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-white text-lg sm:text-xl uppercase">
              {t("Время работы")}
            </div>
            <div className="text-white font-light">
              {t("По местному времени")}
            </div>
          </div>
          <div className="text-md uppercase text-white text-center">
            {t("Будние дни")}
          </div>
          <div className="grid grid-cols-[1fr,50px,1fr]  items-center  grid-rows-1">
            <FormField
              control={form.control}
              name={"weekdays.time_from"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="mobile:hidden block">
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full h-[100%] p-3 pr-10 bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 relative">
                            {field?.value || "00:00"}
                            <LogoButtonIcon
                              width={26}
                              height={26}
                              className="absolute -translate-y-[50%] top-[50%] right-3"
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent className="grid gap-0">
                            <TimePicker
                              setTime={field.onChange}
                              time={field?.value || "00:00"}
                            />
                            <AlertDialogAction>
                              {t("Сохранить")}
                            </AlertDialogAction>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="mobile:block hidden">
                        <OptionsTimepicker
                          setTime={field.onChange}
                          time={field?.value || "00:00"}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Minus color="white" />
            </div>
            <FormField
              control={form.control}
              name={"weekdays.time_to"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="mobile:hidden block">
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full h-[100%] p-3 pr-10 bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 relative">
                            {field?.value || "00:00"}
                            <LogoButtonIcon
                              width={26}
                              height={26}
                              className="absolute -translate-y-[50%] top-[50%] right-3"
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent className="grid gap-0">
                            <TimePicker
                              setTime={field.onChange}
                              time={field?.value || "00:00"}
                            />
                            <AlertDialogAction>
                              {t("Сохранить")}
                            </AlertDialogAction>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="mobile:block hidden">
                        <OptionsTimepicker
                          setTime={field.onChange}
                          time={field?.value || "00:00"}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-md uppercase text-white text-center">
            {t("Выходные дни")}
          </div>
          <div className="grid grid-cols-[1fr,50px,1fr]  items-center  grid-rows-1">
            <FormField
              control={form.control}
              name={"weekends.time_from"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="mobile:hidden block">
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full h-[100%] p-3 pr-10 bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 relative">
                            {field?.value || "00:00"}
                            <LogoButtonIcon
                              width={26}
                              height={26}
                              className="absolute -translate-y-[50%] top-[50%] right-3"
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent className="grid gap-0">
                            <TimePicker
                              setTime={field.onChange}
                              time={field?.value || "00:00"}
                            />
                            <AlertDialogAction>
                              {t("Сохранить")}
                            </AlertDialogAction>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="mobile:block hidden">
                        <OptionsTimepicker
                          setTime={field.onChange}
                          time={field?.value || "00:00"}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Minus color="white" />
            </div>
            <FormField
              control={form.control}
              name={"weekends.time_to"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="mobile:hidden block">
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full h-[100%] p-3 pr-10 bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 relative">
                            {field?.value || "00:00"}
                            <LogoButtonIcon
                              width={26}
                              height={26}
                              className="absolute -translate-y-[50%] top-[50%] right-3"
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent className="grid gap-0">
                            <TimePicker
                              setTime={field.onChange}
                              time={field?.value || "00:00"}
                            />
                            <AlertDialogAction>
                              {t("Сохранить")}
                            </AlertDialogAction>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="mobile:block hidden">
                        <OptionsTimepicker
                          setTime={field.onChange}
                          time={field?.value || "00:00"}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-6 text-white ">
          <div className="text-lg sm:text-xl row-span-2 text-white uppercase">
            {t("Дни работы")}
          </div>
          <div className="grid grid-cols-7">
            {Object.keys(form.formState.defaultValues?.workDays || {}).map(
              (day) => (
                <FormField
                  key={day}
                  control={form.control}
                  name={`workDays.${day}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col items-center gap-4 ">
                          <Switch
                            className="rotate-90 "
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <div className="font-light uppercase">
                            {t(`${day}`)}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
          </div>
        </div>
        <div>
          <div className="grid justify-center items-center pb-4 px-2">
            <p className="font-semibold uppercase text-[#fff] text-xs text-center">
              {t("Минимальная и максимальная сумма")}
            </p>
          </div>
          <div className="grid grid-cols-[1fr,50px,1fr] items-center  grid-row-1">
            <FormField
              control={form.control}
              name={"min_amount"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        className="bg-darkGray text-white text-base rounded-[35px] min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        disabled={!form.getValues("location.code_name")}
                        value={field.value === null ? "" : field.value}
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
              control={form.control}
              name={"max_amount"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        className="bg-darkGray text-white text-base rounded-[35px] min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        disabled={!form.getValues("location.code_name")}
                        value={field.value === null ? "" : field.value}
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
        <Button
          className="w-full border-2  text-mainColor text-lg  sm:text-xl disabled:pointer-events-none bg-darkGray  disabled:bg-lightGray  items-center rounded-[35px] gap-2 select-none uppercase"
          type="submit"
          variant={"outline"}
        >
          {isLoadingAddPartnerCity || isLoadingAddPartnerCountry ? (
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
