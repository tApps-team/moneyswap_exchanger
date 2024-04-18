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

  const inputInCountValue = actualCourse?.in_count === 1;
  const inputOutCountValue = actualCourse?.out_count === 1;

  //refactoring
  useEffect(() => {
    inputInCountValue && form.setValue("giveCurrencyPrice", 1);
    inputOutCountValue && form.setValue("getCurrencyPrice", 1);
  }, [form, inputInCountValue, inputOutCountValue]);

  const inputDisabled =
    !form.getValues("getCurrency") || !form.getValues("giveCurrency");

  const onSubmit = (data: DirectionAddSchemaType) => {
    addDirection({
      city: activeCity,
      in_count: data.giveCurrencyPrice,
      out_count: data.getCurrencyPrice,
      is_active: false,
      valute_from: data.giveCurrency?.code_name || "",
      valute_to: data.getCurrency?.code_name || "",
    })
      .unwrap()
      .then(() => {
        navigate(paths.home);
        toast({
          title: "Направление успешно добаленно",
        });
      });
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-rows-5 grid-cols-1 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"giveCurrency"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-mainColor text-xl">ОТДАЮ</FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel="ОТДАЮ"
                  emptyLabel="Выберите что отдаете"
                  itemIcon={field.value?.icon_url}
                  items={currectAllCurrencies}
                  label={
                    field.value
                      ? `${field.value?.code_name.toUpperCase()} (${field.value?.name.toUpperCase()})`
                      : ""
                  }
                  onClick={(e) => {
                    field.onChange(e);
                    form.resetField("getCurrency");
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
              <FormLabel className="text-mainColor text-xl">ПОЛУЧАЮ</FormLabel>
              <FormControl>
                <ItemSelect
                  inputLabel="ПОЛУЧАЮ"
                  items={currectAvailableCurrncies}
                  emptyLabel="Выберите что получаете"
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
                            alt={`image ${form.getValues("giveCurrency.name")}`}
                            width={32}
                            height={32}
                            className="absolute left-3 top-1/2 -translate-y-1/2  "
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
                      className="border border-white bg-darkGray text-white  rounded-full pl-11 min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0 "
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
                            alt={`image ${form.getValues("getCurrency.name")}`}
                            width={32}
                            height={32}
                            className="absolute left-3 top-1/2 -translate-y-1/2  "
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
                      className="border border-white bg-darkGray text-white  rounded-full pl-11 min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0 "
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="rounded-full border border-bg-darkGray h-14 bg-darkGray text-mainColor text-xl"
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
