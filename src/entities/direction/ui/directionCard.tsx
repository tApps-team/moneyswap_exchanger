import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Switch,
} from "@/shared/ui";
import { FC } from "react";
import styles from "./directionCard.module.scss";
import { UseFormReturn } from "react-hook-form";
import {
  Direction,
  directionSchemaType,
  useDeleteDirectionMutation,
} from "@/entities/direction";
import { DeleteIcon } from "@/shared/assets/icons";
import { DirectionCardSwiper } from "./directionCardSwiper";
import { useToast } from "@/shared/ui/toast";
import { CurrencyType } from "@/shared/types";

interface DirectionCardProps {
  direction: Direction;
  form: UseFormReturn<directionSchemaType>;
  index: number;
}

export const DirectionCard: FC<DirectionCardProps> = ({
  direction,
  form,
  index,
}) => {
  const isActive = form.watch(`directions.${index}.is_active`);

  const [deleteDirection] = useDeleteDirectionMutation();
  const { toast } = useToast();
  const handleDelete = () => {
    deleteDirection({ direction_id: direction.id })
      .unwrap()
      .then(() => {
        toast({
          title: "Направлениe успешно удалено",
          description: "",
          variant: "success",
        });
      })
      .catch((error) => console.error("Ошибка...,", error));
  };

  return (
    <div className={styles.card__container}>
      <DirectionCardSwiper isActive={isActive} cardId={direction.id}>
        <div className={styles.inputs}>
          <div className={styles.input__block}>
            <div className={styles.icon}>
              <img
                src={direction.icon_valute_from}
                className="w-[40px] h-[40px]"
              />
            </div>
            <FormField
              control={form.control}
              name={`directions.${index}.in_count`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="number"
                      disabled={
                        direction.in_count_type === CurrencyType.Cryptocurrency
                      }
                      className=" bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className={styles.code}>{direction.valute_from}</p>
          </div>
          <span className="text-xl">=</span>
          <div className={styles.input__block}>
            <div className={styles.icon}>
              <img src={direction.icon_valute_to} />
            </div>
            <FormField
              control={form.control}
              name={`directions.${index}.out_count`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="number"
                      disabled={
                        direction.out_count_type === CurrencyType.Cryptocurrency
                      }
                      className=" bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className={styles.code}>{direction.valute_to}</p>
          </div>
        </div>
        <div className={styles.card__active}>
          <div className={styles.switcher}>
            <FormField
              control={form.control}
              name={`directions.${index}.is_active`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={
                        isActive ? "border-mainColor" : "border-lightGray"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className={styles.text}>
            {isActive ? "деактивировать пару" : "активировать пару"}
          </p>
        </div>
      </DirectionCardSwiper>
      <div className={styles.delete}>
        <AlertDialog>
          <AlertDialogTrigger>
            <DeleteIcon />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить направление?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отменить</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
