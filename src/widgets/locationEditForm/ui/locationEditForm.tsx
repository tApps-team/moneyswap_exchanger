import {
  LocationEditSchemaType,
  locationEditSchema,
  setActiveLocation,
  useDeletePartnerLocationMutation,
  useEditPartnerLocationMutation,
} from "@/entities/location";
import { ItemSelect } from "@/features/itemSelect";
import { LogoArrowIcon, LogoButtonIcon } from "@/shared/assets";
import { Lang } from "@/shared/config";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";
import { LocationMarker } from "@/shared/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  OptionsTimepicker,
  Switch,
  TimePicker,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const LocationEditForm = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();

  const activeEditLocation = useAppSelector(
    (state) => state.activeLocation.activeLocation
  );

  const form = useForm<LocationEditSchemaType>({
    resolver: zodResolver(locationEditSchema),
    defaultValues: {
      location: {
        id: activeEditLocation?.id,
        name: {
          ru: activeEditLocation?.name?.ru,
          en: activeEditLocation?.name?.en,
        },
        code_name: activeEditLocation?.code_name || undefined,
      },
      deliviry: activeEditLocation?.info?.delivery || false,
      office: activeEditLocation?.info?.office || false,
      weekdays: {
        time_from: activeEditLocation?.info?.weekdays?.time_from || "00:00",
        time_to: activeEditLocation?.info?.weekdays?.time_to || "00:00",
      },
      weekends: {
        time_from: activeEditLocation?.info?.weekends?.time_from || "00:00",
        time_to: activeEditLocation?.info?.weekends?.time_to || "00:00",
      },
      workDays: activeEditLocation?.info?.working_days,
      min_amount: activeEditLocation?.min_amount || null,
      max_amount: activeEditLocation?.max_amount || null,
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const [editPartnerLocation, { isLoading: isLoadingEditPartnerLocation }] =
    useEditPartnerLocationMutation();
  const [deletePartnerLocation, { isLoading: isLoadingDeletePartnerLocation }] =
    useDeletePartnerLocationMutation();

  const onSubmit = (data: LocationEditSchemaType) => {
    const req = {
      id: activeEditLocation?.id,
      marker: activeEditLocation?.code_name
        ? LocationMarker.city
        : LocationMarker.country,
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
    };

    editPartnerLocation(req)
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("Успешно обновленно!"),
        });
        navigate(paths.home);
      });
  };
  const onHandleDelete = (id: number) => {
    const req = {
      id,
      marker: activeEditLocation?.code_name
        ? LocationMarker.city
        : LocationMarker.country,
    };
    deletePartnerLocation(req)
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("Город успешно удален"),
        });
        dispatch(setActiveLocation(null));
        navigate(paths.home);
      })
      .catch(() => {
        toast({
          title: t("Произошла ошибка на сервере, попробуйте позже..."),
          variant: "destructive",
        });
      });
  };

  const formState = form.watch();

  return (
    <Form {...form}>
      <form
        className="grid grid-flow-row grid-cols-1 gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"location"}
          render={() => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-lg font-medium sm:text-xl uppercase">
                {t("Страна")}
              </FormLabel>
              <FormControl>
                <ItemSelect
                  itemIcon={activeEditLocation?.country_flag || ""}
                  disabled={true}
                  label={
                    activeEditLocation?.code_name
                      ? activeEditLocation?.country?.[
                          i18n.language === Lang.ru ? Lang.ru : Lang.en
                        ]
                      : activeEditLocation?.name?.[
                          i18n.language === Lang.ru ? Lang.ru : Lang.en
                        ]
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"location"}
          render={() => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor font-medium text-lg  sm:text-xl uppercase">
                {t("Город")}
              </FormLabel>
              <FormControl>
                <ItemSelect
                  disabled={true}
                  label={
                    activeEditLocation?.code_name
                      ? activeEditLocation?.name?.[
                          i18n.language === Lang.ru ? Lang.ru : Lang.en
                        ]
                      : t("Все города")
                  }
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
              <FormLabel className="text-white text-lg  sm:text-xl uppercase">
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
                            className="-rotate-90"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            defaultChecked={
                              activeEditLocation?.info.working_days[day]
                            }
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
          <div
            className={`transition-all duration-300 ease-in-out grid grid-flow-row gap-6 overflow-hidden ${
              formState.workDays["СБ"] || formState.workDays["ВС"]
                ? "opacity-100 max-h-[300px] pointer-events-auto"
                : "opacity-0 max-h-0 pointer-events-none -mt-6"
            }`}
          >
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
        <div className="flex flex-col gap-4">
          <Button
            className="w-full border-2 text-mainColor text-lg  sm:text-xl disabled:pointer-events-none bg-darkGray  disabled:bg-lightGray  items-center rounded-[35px] gap-2 select-none uppercase"
            type="submit"
            variant={"outline"}
          >
            {isLoadingEditPartnerLocation ? (
              <Loader className="animate-spin" />
            ) : (
              t("Сохранить")
            )}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className="w-full border-none text-darkGray text-lg  sm:text-xl disabled:pointer-events-none bg-mainColor  disabled:bg-lightGray  items-center rounded-[35px] gap-2 select-none uppercase"
              >
                {isLoadingDeletePartnerLocation ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("Удалить")
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("Удалить направление?")}</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("Отменить")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    activeEditLocation && onHandleDelete(activeEditLocation?.id)
                  }
                >
                  {t("Удалить")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div></div>
      </form>
    </Form>
  );
};
