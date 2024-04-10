import { useAvailableValutesQuery } from "@/entities/direction";
import { CurrencySelect } from "@/features/direction";
import { ActualCourse } from "@/features/direction/actualCourse";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const directionSchema = z.object({
  giveCurrency: z
    .object({
      id: z.number().nullable(),
      name: z.string(),
      code_name: z.string(),
      icon_url: z.string(),
    })
    .nullable(),
  getCurrency: z
    .object({
      id: z.number().nullable(),
      name: z.string(),
      code_name: z.string(),
      icon_url: z.string(),
    })
    .nullable(),
  giveCurrencyPrice: z.coerce.number().positive(),
  getCurrencyPrice: z.coerce.number().positive(),
});
export type DirectionSchemaType = z.infer<typeof directionSchema>;
export const DirectionAddForm = () => {
  const form = useForm<DirectionSchemaType>({
    resolver: zodResolver(directionSchema),
    defaultValues: {
      getCurrency: null,
      giveCurrency: null,
      getCurrencyPrice: 0,
      giveCurrencyPrice: 0,
    },
  });
  form.watch(["giveCurrency", "getCurrency"]);

  const { data: currencies } = useAvailableValutesQuery({ base: "all" });
  const { data: availableCurrncies } = useAvailableValutesQuery(
    { base: form.getValues("giveCurrency.code_name") },
    { skip: !form.getValues("giveCurrency.code_name") }
  );

  const currectAllCurrencies = Object.values(currencies || {}).flat();
  const currectAvailableCurrncies = Object.values(
    availableCurrncies || {}
  ).flat();
  const inputDisabled = Boolean(
    form.getValues("getCurrency") && form.getValues("giveCurrency")
  );
  const onSubmit = (data: DirectionSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-row-7 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"giveCurrency"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.value?.name}</FormLabel>
              <FormControl>
                <CurrencySelect
                  currencies={currectAllCurrencies}
                  emptyLabel="Выберите что отдаете"
                  label={field.value?.name || ""}
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
            <FormItem>
              <FormLabel>{field.value?.name}</FormLabel>
              <FormControl>
                <CurrencySelect
                  currencies={currectAvailableCurrncies}
                  emptyLabel="Выберите что получаете"
                  label={field.value?.name || ""}
                  onClick={(e) => field.onChange(e)}
                  disabled={!form.getValues("giveCurrency")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActualCourse
          valuteFrom={form.getValues("getCurrency.code_name")}
          valuteTo={form.getValues("giveCurrency.code_name")}
        />

        <div className="flex items-center gap-10">
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
                      disabled={!inputDisabled}
                      startAdornment={
                        form.getValues("giveCurrency") ? (
                          <img
                            src={form.getValues("giveCurrency.icon_url")}
                            alt={`image ${form.getValues("giveCurrency.name")}`}
                            width={32}
                            height={32}
                            className="absolute left-3 top-1/2 -translate-y-1/2  "
                          />
                        ) : undefined
                      }
                      className="border-2  rounded-full pl-11 w-[110px] focus-visible:ring-transparent focus-visible:ring-offset-0 "
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        ) : undefined
                      }
                      disabled={!inputDisabled}
                      className="border-2  rounded-full pl-11 w-[110px] focus-visible:ring-transparent focus-visible:ring-offset-0 "
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Добавить </Button>
      </form>
    </Form>
  );
};
