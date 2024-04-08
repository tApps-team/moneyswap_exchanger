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
import { useAppDispatch } from "@/shared/model";
import { useNavigate } from "react-router-dom";
import { paths } from "@/shared/routing";
import { useLoginMutation, userSlice } from "@/entities/user";
import { CustomLoader } from "@/shared/ui/customLoader";

export const AuthByUserNameForm = () => {
  const authForm = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [Login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: AuthFormSchema) => {
    Login(data)
      .unwrap()
      .then((data) => {
        dispatch(userSlice.actions.login(data));
        navigate(paths.home);
      })
      .catch((error) => {
        console.error("Ошибка получения токена:", error);
      });
  };
  return (
    <div className="container">
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
                      className="rounded-full pl-12"
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
                    className="rounded-full pl-12"
                    placeholder="••••••••••••"
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
            {isLoading ? <CustomLoader /> : "Войти"}
          </Button>
        </form>
      </Form>
      {error && (
        <h1 className="text-red-500 font-medium text-center mt-5">
          Неверный логин или пароль
        </h1>
      )}
    </div>
  );
};
