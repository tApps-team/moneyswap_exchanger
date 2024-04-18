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
  Switch,
} from "@/shared/ui";
import { ChangeEvent, FC } from "react";
import styles from "./directionCard.module.scss";
import { UseFormReturn } from "react-hook-form";
import {
  Direction,
  directionSchemaType,
  useDeleteDirectionMutation,
} from "@/entities/direction";
import { DeleteIcon } from "@/shared/assets/icons";
import { DirectionCardSwiper } from "./directionCardSwiper";

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
  const inCount = form.watch(`directions.${index}.in_count`);
  const outCount = form.watch(`directions.${index}.out_count`);

  const handleChangeInCount = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue >= 0) {
      form.setValue(`directions.${index}.in_count`, inputValue);
    }
  };
  const handleChangeOutCount = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue >= 0) {
      form.setValue(`directions.${index}.out_count`, inputValue);
    }
  };

  const [deleteDirection] = useDeleteDirectionMutation();

  const handleDelete = () => {
    deleteDirection({ direction_id: direction.id })
      .unwrap()
      .then(() => {
        console.log("success delete");
      })
      .catch((error) => console.error("Ошибка...,", error));
  };

  return (
    <div className={styles.card__container}>
      <DirectionCardSwiper isActive={isActive}>
        <div className={styles.inputs}>
          <div className={styles.input__block}>
            <div className={styles.icon}>
              <img
                src={direction.icon_valute_from}
                className="w-[40px] h-[40px]"
              />
            </div>
            <input
              type="number"
              value={inCount || 0}
              onChange={handleChangeInCount}
              className={`${styles.input} ${
                direction.in_count === 1 && styles.input_disable
              }`}
              disabled={direction.in_count === 1}
            />
            <p className={styles.code}>{direction.valute_from}</p>
          </div>
          <span className="text-2xl">=</span>
          <div className={styles.input__block}>
            <div className={styles.icon}>
              <img
                src={direction.icon_valute_to}
                className="w-[40px] h-[40px]"
              />
            </div>
            <input
              type="number"
              value={outCount || 0}
              onChange={handleChangeOutCount}
              className={`${styles.input} ${
                direction.out_count === 1 && styles.input_disable
              }`}
              disabled={direction.out_count === 1}
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
