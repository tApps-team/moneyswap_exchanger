import { z } from "zod";
import { Cities } from "../cities";
import { Directions } from "../directions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@/shared/ui";

export const directionSchema = z.object({
  activeCity: z.object({
    id: z.number(),
    name: z.string(),
    code_name: z.string(),
    country: z.string(),
    country_flag: z.string(),
    info: z.object({
      delivery: z.boolean(),
      office: z.boolean(),
      working_days: z.record(z.string(), z.boolean()),
      time_from: z.string(),
      time_to: z.string(),
    }),
  }),
  directions: z.array(
    z.object({
      id: z.number(),
      valute_from: z.string(),
      icon_valute_from: z.string(),
      valute_to: z.string(),
      icon_valute_to: z.string(),
      in_count: z.number(),
      out_count: z.number(),
      is_active: z.boolean(),
    })
  ),
});

export type directionSchemaType = z.infer<typeof directionSchema>;

export const MyDirections = () => {
  const form = useForm<directionSchemaType>({
    resolver: zodResolver(directionSchema),
    defaultValues: {
      activeCity: {},
      directions: [],
    },
  });
  form.watch(["activeCity", "directions"]);

  const onSubmit = (data: directionSchemaType) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Cities form={form} />
          <Directions form={form} />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
