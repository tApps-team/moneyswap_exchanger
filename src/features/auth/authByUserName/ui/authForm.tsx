import { useLoginMutation, userSlice } from "@/entities/user";
import { useAppDispatch } from "@/shared/model";
import { paths } from "@/shared/routing";
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
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthFormSchema, authFormSchema } from "../model/authFormSchema";

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
  const { toast } = useToast();

  const onSubmit = async (data: AuthFormSchema) => {
    Login(data)
      .unwrap()
      .then((data) => {
        dispatch(userSlice.actions.login(data));
        navigate(paths.home);
      })
      .catch((error) => {
        console.error("Ошибка получения токена:", error);
        toast({
          title: "Ошбика",
          variant: "destructive",
        });
      });
  };
  return (
    <div className="container">
      <Form {...authForm}>
        <form
          className="grid grid-cols-1 grid-rows-3 gap-10"
          onSubmit={authForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={authForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    startAdornment={
                      <Mail
                        color="#F6FF5F"
                        className="absolute left-3 translate-y-6 "
                      />
                    }
                    className="text-white h-mainHeight border-2 font-normal uppercase placeholder:text-white rounded-[35px] pl-12 bg-darkGray"
                    placeholder="E-MAIL"
                    {...field}
                  />
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
                    className="text-white h-mainHeight border-2 font-normal uppercase placeholder:text-white rounded-[35px] pl-12 bg-darkGray"
                    placeholder="••••••••••••"
                    {...field}
                    eyeIcon
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className=" w-full rounded-[35px] uppercase font-semibold text-xl text-mainColor bg-darkGray"
            type="submit"
          >
            {isLoading ? <Loader className="animate-spin" /> : "ВОЙТИ"}
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
