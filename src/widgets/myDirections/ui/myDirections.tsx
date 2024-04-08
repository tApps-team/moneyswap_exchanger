import { Cities } from "../cities";
import { Directions } from "../directions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@/shared/ui";
import { directionSchema, directionSchemaType } from "@/entities/direction";

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
