import {
  DirectionAddSchemaType,
  directionAddSchema,
  useActualCourseQuery,
  useAddDirectionMutation,
  useAvailableValutesQuery,
} from "@/entities/direction";
import { ActualCourse } from "@/features/direction/actualCourse";
import { ItemSelect } from "@/features/itemSelect";
import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";
import { CurrencyType } from "@/shared/types";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const DirectionAddForm = () => {
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

  const { data: availableCurrncies } = useAvailableValutesQuery(
    { base: form.getValues("giveCurrency.code_name") },
    { skip: !form.getValues("giveCurrency.code_name") }
  );

  const currectAllCurrencies = Object.values(currencies || {}).flat();
  const currectAvailableCurrncies = Object.values(
    availableCurrncies || {}
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

  const inputInCountValue =
    form.getValues("giveCurrency")?.type_valute === CurrencyType.Cryptocurrency;

  const inputOutCountValue =
    form.getValues("getCurrency")?.type_valute === CurrencyType.Cryptocurrency;

  // const inputInCountValue = actualCourse?.in_count === 1;
  // const inputOutCountValue = actualCourse?.out_count === 1;

  //refactoring
  useEffect(() => {
    inputInCountValue && form.setValue("giveCurrencyPrice", 1);
    inputOutCountValue && form.setValue("getCurrencyPrice", 1);

    inputInCountValue &&
      form.setValue("getCurrencyPrice", actualCourse?.out_count || 0);
    inputOutCountValue &&
      form.setValue("giveCurrencyPrice", actualCourse?.in_count || 0);
  }, [
    actualCourse?.in_count,
    actualCourse?.out_count,
    form,
    inputInCountValue,
    inputOutCountValue,
  ]);

  const inputDisabled =
    !form.getValues("getCurrency") || !form.getValues("giveCurrency");

  const onSubmit = (data: DirectionAddSchemaType) => {
    addDirection({
      city: activeCity,
      in_count: data.giveCurrencyPrice,
      out_count: data.getCurrencyPrice,
      is_active: true,
      valute_from: data.giveCurrency?.code_name || "",
      valute_to: data.getCurrency?.code_name || "",
    })
      .unwrap()
      .then(() => {
        navigate(paths.home);
        toast({
          title: "Направление успешно добалено",
          variant: "success",
        });
      })
      .catch((error) => {
        if (error.status === 423) {
          toast({
            title: "Такое направление уже добавлено!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Произошла ошибка на сервере, попробуйте позже...",
            variant: "destructive",
          });
        }
      });
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-rows-[1fr,1fr,70px,1fr,1fr] grid-cols-1 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"giveCurrency"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-lg font-medium sm:text-xl">
                ОТДАЮ
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel="ОТДАЮ"
                  inputPlaceholder="ПОИСК ВАЛЮТЫ"
                  emptyLabel="выберите валюту"
                  itemIcon={field.value?.icon_url}
                  items={currectAllCurrencies}
                  label={
                    field.value
                      ? `${field.value?.code_name} (${field.value?.name})`
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
              <FormLabel className="text-mainColor text-lg font-medium sm:text-xl">
                ПОЛУЧАЮ
              </FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel="ПОЛУЧАЮ"
                  inputPlaceholder="ПОИСК ВАЛЮТЫ"
                  items={currectAvailableCurrncies}
                  itemIcon={field.value?.icon_url}
                  emptyLabel="выберите валюту"
                  label={field.value?.name || ""}
                  disabled={!form.getValues("giveCurrency")}
                  onClick={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActualCourse actualCourse={actualCourse} />

        <div>
          <div className="grid justify-center items-center py-4 px-2">
            <p className="font-semibold uppercase text-[#fff] text-xs text-center">
              Укажите свой курс в поле ниже
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
                        disabled={inputDisabled || inputInCountValue}
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
                        disabled={inputDisabled || inputOutCountValue}
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

        <Button
          className="rounded-[35px] border border-bg-darkGray text-lg  sm:text-xl h-[70px] bg-darkGray text-mainColor"
          type="submit"
        >
          {isLoadingAddDirection ? (
            <Loader className="animate-spin" />
          ) : (
            "ДОБАВИТЬ"
          )}
        </Button>
      </form>
    </Form>
  );
};
