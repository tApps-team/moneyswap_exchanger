import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Switch,
} from "@/shared/ui";
import { Direction } from "../../../entities/direction/model/types";
import { ChangeEvent, FC } from "react";
import styles from "./directionCard.module.scss";
import { UseFormReturn } from "react-hook-form";
import { directionSchemaType } from "@/entities/direction";

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
    if (inputValue > 0 && inputValue !== 1) {
      form.setValue(`directions.${index}.in_count`, inputValue);
    }
  };
  const handleChangeOutCount = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue > 0 && inputValue !== 1) {
      form.setValue(`directions.${index}.out_count`, inputValue);
    }
  };

  return (
    <div className={`${styles.card} ${!isActive && styles.is_active}`}>
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
            value={inCount || 2}
            onChange={handleChangeInCount}
            className={`${styles.input} ${
              inCount === 1 && styles.input_disable
            }`}
            disabled={inCount === 1}
          />
          <p className={styles.code}>{direction.valute_from}</p>
        </div>
        <span className="text-3xl">=</span>
        <div className={styles.input__block}>
          <div className={styles.icon}>
            <img src={direction.icon_valute_to} className="w-[40px] h-[40px]" />
          </div>
          <input
            type="number"
            value={outCount || 2}
            onChange={handleChangeOutCount}
            className={`${styles.input} ${
              outCount === 1 && styles.input_disable
            }`}
            disabled={outCount === 1}
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
    </div>
  );
};
