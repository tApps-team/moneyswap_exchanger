import { useChangePasswordMutation } from "@/entities/user/api/authService";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  PasswordInput,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "../model/changePasswordSchema";

export const ChangePasswordForm = () => {
  const changePasswordForm = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { toast } = useToast();
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  const onSubmit = async (data: ChangePasswordSchema) => {
    const { newPassword } = data;
    changePassword({ new_password: newPassword })
      .unwrap()
      .then(() => {
        changePasswordForm.reset();
        toast({
          title: "Пароль успешно изменен!",
          description: "Если забыли пароль, свяжитесь с нами",
        });
      })
      .catch(() => {
        toast({
          title: "Ошибка",
        });
      });
  };
  return (
    <div className="container">
      <Form {...changePasswordForm}>
        <form
          className="grid  gap-20"
          onSubmit={changePasswordForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={changePasswordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    eyeIcon={true}
                    type="password"
                    placeholder="••••••••••••••••"
                    className="rounded-full h-14 placeholder:text-white placeholder:text-3xl bg-darkGray"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-10">
            <FormField
              control={changePasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      type="password"
                      placeholder="Новый пароль"
                      className="rounded-full h-14 text-center placeholder:text-white bg-darkGray"
                      {...field}
                      eyeIcon={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      type="password"
                      className="rounded-full text-center h-14 placeholder:text-white bg-darkGray"
                      placeholder="Одноразовый пароль"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="rounded-full bg-[#F6FF5F]  text-black text-lg h-16 "
          >
            {isLoading ? <Loader className="animate-spin" /> : "Сохранить"}
          </Button>
        </form>
      </Form>
      {error && (
        <h1 className="text-red-500 font-medium text-center mt-5">
          Аккаунт не найден...
        </h1>
      )}
    </div>
  );
};
