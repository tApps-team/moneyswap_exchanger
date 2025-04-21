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
import { UseFormReturn } from "react-hook-form";
import { directionSchemaType } from "@/entities/direction";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DirectionControlsProps {
  form: UseFormReturn<directionSchemaType>;
  index: number;
  isActive: boolean;
  onDelete: () => void;
}

export const DirectionControls: React.FC<DirectionControlsProps> = ({
  form,
  index,
  isActive,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative grid grid-cols-[0.1fr,1fr] gap-2 items-center">
      <div className="mt-[5px]">
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
      <p className="uppercase mobile:text-[10px] text-[9px] font-medium ">
        {isActive ? t("активная пара") : t("неактивная пара")}
      </p>
      <div className="absolute right-0 top-0 h-full flex justify-center items-center w-[24px] z-1">
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
              <AlertDialogAction onClick={onDelete}>
                {t("Удалить")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}; 