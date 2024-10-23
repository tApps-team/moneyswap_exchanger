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
import { useTranslation } from "react-i18next";

export const ChangePasswordForm = () => {
  const { t } = useTranslation();
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
          title: t("Пароль успешно изменен!"),
          description: t("Если забыли пароль, свяжитесь с нами"),
        });
      })
      .catch(() => {
        toast({
          title: t("Ошибка"),
        });
      });
  };
  return (
    <div className="container h-[calc(100dvh_-_230px)]">
      <Form {...changePasswordForm}>
        <form
          className="grid grid-rows-[70px,1fr,70px] items-center h-full"
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
                    placeholder="*********"
                    className="rounded-[35px] font-sm text-center  placeholder:text-white  bg-darkGray"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-6">
            <FormField
              control={changePasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      type="password"
                      placeholder={t("Новый пароль")}
                      className="rounded-[35px] font-sm text-center placeholder:text-white bg-darkGray"
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
                      className="rounded-[35px] text-center font-sm placeholder:text-white bg-darkGray"
                      placeholder={t("Повторите пароль")}
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
            className="rounded-[35px] bg-[#F6FF5F]  text-black text-lg sm:text-xl uppercase text-semibold  border-none"
          >
            {isLoading ? <Loader className="animate-spin" /> : t("Сохранить")}
          </Button>
        </form>
      </Form>
      {error && (
        <h1 className="text-red-500 font-medium text-center mt-5">
          {t("Аккаунт не найден...")}
        </h1>
      )}
    </div>
  );
};
