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
import { useToast } from "@/shared/ui/toast";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/model";
import { LocationMarker } from "@/shared/types";

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
  const { t } = useTranslation();
  const isActive = form.watch(`directions.${index}.is_active`);
  const activeLocation = useAppSelector(
    (state) => state.activeLocation.activeLocation
  );

  const [deleteDirection] = useDeleteDirectionMutation();
  const { toast } = useToast();
  const handleDelete = () => {
    if (activeLocation) {
      deleteDirection({
        id: activeLocation?.id,
        direction_id: direction.id,
        marker: activeLocation?.code_name
          ? LocationMarker.city
          : LocationMarker.country,
      })
        .unwrap()
        .then(() => {
          toast({
            title: t("Направлениe успешно удалено"),
            description: "",
            variant: "success",
          });
        })
        .catch((error) => console.error("Ошибка...,", error));
    }
  };

  return (
    <div
      className={`${styles.card__container} ${!isActive && styles.not_active}`}
    >
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
                    className=" bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className={styles.code}>{direction?.valute_from}</p>
        </div>
        <span className="text-xl">=</span>
        <div className={styles.input__block}>
          <div className={styles.icon}>
            <img src={direction?.icon_valute_to} />
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
                    className=" bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className={styles.code}>{direction?.valute_to}</p>
          {direction.bankomats && direction?.bankomats?.length > 0 && (
            <div className="absolute top-full mt-[26px] left-0 w-full justify-start inline-flex flex-wrap flex-row gap-1 cursor-pointer">
              {direction?.bankomats?.map((bank) => (
                <div
                  key={bank?.id}
                  className="rounded-full overflow-hidden w-4 h-4 flex-shrink-0 cursor-pointer"
                >
                  <img src={bank?.icon} alt="icon" className="w-4 h-4" />
                </div>
              ))}
            </div>
          )}
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
                    className="border-darkGray"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <p className={styles.text}>
          {isActive ? t("активная пара") : t("неактивная пара")}
        </p>
        <div className={styles.delete}>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash2 />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("Удалить направление?")}</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("Отменить")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  {t("Удалить")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
