import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  PasswordInput,
} from "@/shared/ui";
import { useForm } from "react-hook-form";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "../model/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";

export const ChangePasswordForm = () => {
  const changePasswordForm = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: ChangePasswordSchema) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    console.log(currentPassword, newPassword, confirmPassword);
  };
  return (
    <div className=" container w-[400px]">
      <Form {...changePasswordForm}>
        <form
          className="grid  gap-6"
          onSubmit={changePasswordForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={changePasswordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="*******"
                    className="rounded-full "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={changePasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Новый пароль"
                    className="rounded-full"
                    {...field}
                    endIcon={
                      <SquarePen className="absolute right-2 -translate-y-8" />
                    }
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
                    className="rounded-full"
                    placeholder="Одноразовый пароль"
                    {...field}
                    endIcon={
                      <SquarePen className="absolute right-2 -translate-y-8" />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="rounded-full bg-[#F6FF5F]  text-black text-lg h-16 "
          >
            Сохранить изменения
          </Button>
        </form>
      </Form>
    </div>
  );
};
