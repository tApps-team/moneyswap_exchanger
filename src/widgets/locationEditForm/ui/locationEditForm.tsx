import {
  LocationEditSchemaType,
  locationEditSchema,
  useDeletePartnerCityMutation,
  useEditPartnerCityMutationAuth,
} from "@/entities/location";
import { ItemSelect } from "@/features/itemSelect";
import { LogoButtonIcon } from "@/shared/assets";
import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";

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
  Switch,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LocationEditForm = () => {
  const activeEditCity = useAppSelector((state) => state.activeCity.activeCity);

  const form = useForm<LocationEditSchemaType>({
    resolver: zodResolver(locationEditSchema),
    defaultValues: {
      city: {
        code_name: activeEditCity?.code_name,
        name: activeEditCity?.name,
      },
      country: {
        country_flag: activeEditCity?.country,
        name: activeEditCity?.country,
      },
      deliviry: activeEditCity?.info.delivery,
      office: activeEditCity?.info.office,
      timeEnd: activeEditCity?.info.time_from,
      timeStart: activeEditCity?.info.time_to,
      workDays: activeEditCity?.info.working_days,
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editPartnerCity, { isLoading: isLoadingEditPartnerCity }] =
    useEditPartnerCityMutationAuth();
  const [deletePartnerCity, { isLoading: isLoadingDeletePartnerCity }] =
    useDeletePartnerCityMutation();
  const onSubmit = (data: LocationEditSchemaType) => {
    console.log(data);
    editPartnerCity({
      city: activeEditCity?.code_name,
      delivery: data.deliviry,
      office: data.office,
      time_from: data.timeStart,
      time_to: data.timeEnd,
      working_days: data.workDays,
    })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: "Успешно обновленно!",
        });
        navigate(paths.home);
      });
  };
  const onHandleDelete = (id: number) => {
    deletePartnerCity({ id: id })
      .unwrap()
      .then(() => {
        toast({
          variant: "destructive",
          title: "Delete",
        });
        navigate(paths.home);
      });
  };
  console.log(activeEditCity?.info.time_from);
  return (
    <Form {...form}>
      <form
        className="grid grid-flow-row grid-cols-1 gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"country"}
          render={() => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-xl">СТРАНА</FormLabel>
              <FormControl>
                <ItemSelect
                  itemIcon={activeEditCity?.country_flag || ""}
                  disabled={true}
                  label={activeEditCity?.country}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"city"}
          render={() => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-xl">ГОРОД</FormLabel>
              <FormControl>
                <ItemSelect disabled={true} label={activeEditCity?.name} />
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
              <FormLabel className="text-white text-xl">ДОСТАВКА</FormLabel>
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
              <FormLabel className="text-white text-xl">ЕСТЬ ОФИС</FormLabel>
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
            <div className="text-white text-xl">ВРЕМЯ РАБОТЫ</div>
            <div className="text-white ">По местному времени</div>
          </div>
          <div className="grid grid-cols-[1fr,50px,1fr]  items-center  grid-rows-1">
            <FormField
              control={form.control}
              name={"timeStart"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      className="h-[38px] p-2 border-none bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 "
                      {...field}
                      endAdornment={
                        <LogoButtonIcon
                          width={26}
                          height={26}
                          className="absolute -translate-y-8 right-2"
                        />
                      }
                    />
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
                    <Input
                      type="time"
                      className="h-[38px] p-2 border-none bg-darkGray text-white rounded-2xl focus-visible:ring-transparent focus-visible:ring-offset-0 "
                      {...field}
                      endAdornment={
                        <LogoButtonIcon
                          width={26}
                          height={26}
                          className="absolute -translate-y-8 right-2"
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-6 text-white ">
          <div className="text-xl row-span-2 text-white">ДНИ РАБОТЫ</div>
          <div className="grid grid-cols-7   ">
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
                            defaultChecked={
                              activeEditCity?.info.working_days[day]
                            }
                          />
                          <div>{day}</div>
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
        <div className="flex flex-col gap-4">
          <Button
            className="w-full border-2 text-mainColor text-xl disabled:pointer-events-none bg-darkGray  disabled:bg-lightGray  items-center rounded-[35px] gap-2 select-none"
            type="submit"
            variant={"outline"}
          >
            {isLoadingEditPartnerCity ? (
              <Loader className="animate-spin" />
            ) : (
              "СОХРАНИТЬ"
            )}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className="w-full border-2 text-darkGray text-xl disabled:pointer-events-none bg-mainColor  disabled:bg-lightGray  items-center rounded-[35px] gap-2 select-none"
              >
                {isLoadingDeletePartnerCity ? (
                  <Loader className="animate-spin" />
                ) : (
                  "УДАЛИТЬ"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить направление?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отменить</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    activeEditCity && onHandleDelete(activeEditCity?.id)
                  }
                >
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
};
