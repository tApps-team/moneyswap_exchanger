import {
  LocationSchemaType,
  locationSchema,
  useAddPartnerCityMutation,
  useAllCountriesQuery,
  useCitiesByCountryNameQuery,
} from "@/entities/location";
import { ItemSelect } from "@/features/itemSelect";
import { LogoButtonIcon } from "@/shared/assets";
import { paths } from "@/shared/routing";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Switch,
  TimePicker,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LocationAddForm = () => {
  const form = useForm<LocationSchemaType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      city: undefined,
      country: undefined,
      deliviry: false,
      office: false,
      timeEnd: "00:00",
      timeStart: "00:00",
      workDays: {
        ПН: true,
        ВТ: true,
        СР: true,
        ЧТ: true,
        ПТ: true,
        СБ: true,
        ВС: true,
      },
    },
  });

  const navigate = useNavigate();

  const { toast } = useToast();

  const [addPartnerCity, { isLoading: isLoadingAddPartnerCity }] =
    useAddPartnerCityMutation();

  const onSubmit = (data: LocationSchemaType) => {
    console.log(data);

    addPartnerCity({
      city: data.city?.code_name,
      delivery: data.deliviry,
      office: data.office,
      time_from: data.timeStart,
      time_to: data.timeEnd,
      working_days: data.workDays,
    })
      .unwrap()
      .then(() => {
        navigate(paths.home);
        toast({
          title: "Город успешно добавлен!",
          description: "Он появится на главной странице",
          variant: "success",
        });
      })
      .catch((err) => {
        if (err.status === 423) {
          toast({
            title: "Такой город уже существует",
            description: "Измените город!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Произошла ошибка на сервере, попробуйте позже...",
            variant: "destructive",
          });
        }
      });
  };

  form.watch(["timeStart", "timeEnd", "country.name"]);

  const { data: countries } = useAllCountriesQuery();
  const { data: cities } = useCitiesByCountryNameQuery(
    {
      country_name: form.getValues("country.name"),
    },
    { skip: !form.getValues("country.name") }
  );

  return (
    <Form {...form}>
      <form
        className="grid grid-flow-row grid-cols-1 gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"country"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-lg font-light sm:text-xl">
                СТРАНА
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel="ВЫБОР СТРАНЫ"
                  emptyLabel="ВЫБЕРИТЕ СТРАНУ"
                  itemIcon={field.value?.country_flag}
                  inputPlaceholder="ПОИСК СТРАНЫ"
                  items={countries}
                  label={field.value?.name || ""}
                  onClick={(e) => {
                    field.onChange(e);
                    form.resetField("city");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"city"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor font-light text-lg sm:text-xl">
                ГОРОД
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel="ВЫБОР ГОРОДА"
                  disabled={!form.getValues("country")}
                  onClick={(e) => field.onChange(e)}
                  items={cities || []}
                  inputPlaceholder="ПОИСК ГОРОДА"
                  label={field.value?.name}
                  emptyLabel="ВЫБЕРИТЕ ГОРОД"
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
              <FormLabel className="text-white text-lg sm:text-xl ">
                ДОСТАВКА
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
              <FormLabel className="text-white text-lg sm:text-xl">
                ЕСТЬ ОФИС
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
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-white text-lg sm:text-xl">ВРЕМЯ РАБОТЫ</div>
            <div className="text-white font-light">По местному времени</div>
          </div>
          <div className="grid grid-cols-[1fr,50px,1fr]  items-center  grid-rows-1">
            <FormField
              control={form.control}
              name={"timeStart"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full h-[100%] p-3 pr-10 bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 relative">
                        {field.value}
                        <LogoButtonIcon
                          width={26}
                          height={26}
                          className="absolute -translate-y-[50%] top-[50%] right-3"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="grid gap-0">
                        <TimePicker
                          setTime={field.onChange}
                          time={field.value}
                        />
                        <AlertDialogAction>Сохранить</AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>
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
              name={"timeEnd"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full h-[100%] p-3 pr-10 bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 relative">
                        {field.value}
                        <LogoButtonIcon
                          width={26}
                          height={26}
                          className="absolute -translate-y-[50%] top-[50%] right-3"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="grid gap-0">
                        <TimePicker
                          setTime={field.onChange}
                          time={field.value}
                        />
                        <AlertDialogAction>СОХРАНИТЬ</AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-6 text-white ">
          <div className="text-lg sm:text-xl row-span-2 text-white">
            ДНИ РАБОТЫ
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
                          <div className="font-light uppercase">{day}</div>
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
        <Button
          className="w-full border-2  text-mainColor text-lg  sm:text-xl disabled:pointer-events-none bg-darkGray  disabled:bg-lightGray  items-center rounded-[35px] gap-2 select-none"
          type="submit"
          variant={"outline"}
        >
          {isLoadingAddPartnerCity ? (
            <Loader className="animate-spin" />
          ) : (
            "ДОБАВИТЬ"
          )}
        </Button>
        <div></div>
      </form>
    </Form>
  );
};
