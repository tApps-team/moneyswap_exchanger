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
import { Trash2, Infinity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/model";
import { LocationMarker } from "@/shared/types";
import { LogoButtonIcon } from "@/shared/assets";

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
  const { toast } = useToast();

  const [deleteDirection] = useDeleteDirectionMutation();
  const activeLocation = useAppSelector(
    (state) => state.activeLocation.activeLocation
  );

  const isActive = form.watch(`directions.${index}.is_active`);
  const exchangeRates = form.watch(`directions.${index}.exchange_rates`);

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
      style={{ height: (!exchangeRates || exchangeRates.length <= 1) ? "150px" : "auto" }}
    >
      <div className="grid grid-flow-row gap-2">
            {exchangeRates && exchangeRates.length > 1 && (
          <div className="grid grid-cols-[auto,1fr] justify-center items-center gap-[10px]">
            <span className="font-semibold text-sm text-black">{t("Сумма")}:</span>
            <div className="grid grid-cols-[1fr,auto,1fr] gap-5 items-center justify-stretch justify-items-stretch">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm text-black/50">{t("от")}:</span>
                  <FormField
                    control={form.control}
                    name={`directions.${index}.exchange_rates.0.min_count`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            value={0}
                            type="number"
                            className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-10"
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              <div>
                <LogoButtonIcon fill="#000" className="size-4 -rotate-90"/>
              </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm text-white/50">{t("до")}:</span>
                  <FormField
                    control={form.control}
                    name={`directions.${index}.exchange_rates.0.max_count`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            type="number"
                            className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-10"
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            onChange={(e) => {
                              const value = e.target.value === "" ? 0 : Number(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
            </div>
          </div>
      )}
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
            name={`directions.${index}.exchange_rates.0.in_count`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="number"
                    className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className={`${styles.code} font_unbounded`}>
            {direction?.valute_from}
          </p>
        </div>
        <span className="text-xl">=</span>
        <div className={styles.input__block}>
          <div className={styles.icon}>
            <img src={direction?.icon_valute_to} />
          </div>
          <FormField
            control={form.control}
            name={`directions.${index}.exchange_rates.0.out_count`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="number"
                    className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className={`${styles.code} font_unbounded`}>
            {direction?.valute_to}
          </p>
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
      </div>

      {exchangeRates && exchangeRates.length > 1 && (
        <div className="mt-4 space-y-4">
          {exchangeRates.slice(1).map((rate, rateIndex) => (
            <div key={rateIndex + 1} className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-sm text-black">{t("Сумма")}:</span>
                <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
                  <div className="">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm text-white/50">{t("от")}:</span>
                      <FormField
                        control={form.control}
                        name={`directions.${index}.exchange_rates.${rateIndex + 1}.min_count`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                type="number"
                                className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-10"
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? 0 : Number(e.target.value);
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <LogoButtonIcon fill="#000" className="size-4 -rotate-90"/>
                  </div>
                  <div className="">
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm ${rateIndex + 1 === exchangeRates.length - 1 ? "text-black/50" : "text-white/50"}`}>{t("до")}:</span>
                      <FormField
                        control={form.control}
                        name={`directions.${index}.exchange_rates.${rateIndex + 1}.max_count`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                type="number"
                                className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base pl-10"
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                disabled={rateIndex + 1 === exchangeRates.length - 1}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? 0 : Number(e.target.value);
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {rateIndex + 1 === exchangeRates.length - 1 && (
                        <button
                          type="button"
                          className="absolute right-7 top-1/2 -translate-y-1/2"
                        >
                          <Infinity className="size-4 text-white/50" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-sm text-black">{t("Курс")}:</span>
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name={`directions.${index}.exchange_rates.${rateIndex + 1}.in_count`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            type="number"
                            className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            onChange={(e) => {
                              const value = e.target.value === "" ? 0 : Number(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="text-xl leading-none font-semibold">=</span>
                  <FormField
                    control={form.control}
                    name={`directions.${index}.exchange_rates.${rateIndex + 1}.out_count`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            type="number"
                            className="bg-darkGray border-none text-white p-2.5 rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 text-center h-[34px] text-base"
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            onChange={(e) => {
                              const value = e.target.value === "" ? 0 : Number(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="font-semibold text-sm text-black">
                  {rate.rate_coefficient}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
