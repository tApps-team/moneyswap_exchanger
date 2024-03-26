import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/shared/ui";
import { PasswordInput } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthFormSchema, authFormSchema } from "../model/authFormSchema";

export const AuthByUserNameForm = () => {
  const authForm = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data: AuthFormSchema) => {
    const { password, username } = data;
    // authMutation
    console.log(password, username);
  };
  return (
    <div className="container w-[600px]">
      <Form {...authForm}>
        <form
          className="grid grid-cols-1 grid-rows-3 gap-6"
          onSubmit={authForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={authForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 translate-y-2 " />
                    <Input
                      className="rounded-full pl-10"
                      placeholder="Имя Фамилия"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={authForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    type="password"
                    className="rounded-full"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-[#F6FF5F] text-black  w-full rounded-full"
            type="submit"
          >
            Войти
          </Button>
        </form>
      </Form>
    </div>
  );
};
