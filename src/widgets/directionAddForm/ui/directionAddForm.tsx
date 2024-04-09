import { useAvailableValutesQuery } from "@/entities/direction";
import { CurrencySelect } from "@/features/direction";
import { LocationSelect } from "@/features/location";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const directionSchema = z.object({
  giveCurrency: z.string(),
  getCurrency: z.string(),
  giveCurrencyPrice: z.number(),
  getCurrencyPrice: z.number(),
});
export type DirectionSchemaType = z.infer<typeof directionSchema>;
export const DirectionAddForm = () => {
  const form = useForm<DirectionSchemaType>({
    resolver: zodResolver(directionSchema),
    defaultValues: {
      getCurrency: "",
      giveCurrency: "",
      getCurrencyPrice: 0,
      giveCurrencyPrice: 0,
    },
  });
  form.watch(["giveCurrency", "getCurrency"]);

  const { data: currencies } = useAvailableValutesQuery({ base: "all" });
  const { data: availableCurrncies } = useAvailableValutesQuery(
    { base: form.getValues("giveCurrency") },
    { skip: !form.getValues("giveCurrency") }
  );

  const currectAllCurrencies = Object.values(currencies || {}).flat();
  const currectAvailableCurrncies = Object.values(
    availableCurrncies || {}
  ).flat();

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
              <FormLabel>{field.value}</FormLabel>
              <FormControl>
                <CurrencySelect
                  currencies={currectAllCurrencies}
                  emptyLabel="Выберите что отдаете"
                  label={field.value}
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
              <FormLabel>{field.value}</FormLabel>
              <FormControl>
                <CurrencySelect
                  currencies={currectAvailableCurrncies}
                  emptyLabel="Выберите что получаете"
                  label={field.value}
                  onClick={(e) => field.onChange(e)}
                  disabled={!form.getValues("giveCurrency")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Добавить </Button>
      </form>
    </Form>
  );
};

// <CurrencySelect
//   emptyLabel="Выберите что отдаете"
//   label="asd"
//   currencies={currectAllCurrencies || {}}
// />
