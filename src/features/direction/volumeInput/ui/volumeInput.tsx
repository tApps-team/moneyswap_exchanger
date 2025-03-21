import { Input } from "@/shared/ui";
import { Control } from "react-hook-form";
import { DirectionAddSchemaType } from "@/entities/direction";
import { Infinity } from "lucide-react";
import { useTranslation } from "react-i18next";

interface VolumeInputProps {
  control: Control<DirectionAddSchemaType>;
  index: number;
  field: "min_count" | "max_count";
  label: string;
  isLastMaxCount?: boolean;
  onSetInfinity?: () => void;
  isInfinity?: boolean;
  onValueChange?: (value: number) => void;
}

export const VolumeInput = ({ 
  control, 
  index, 
  field, 
  label, 
  isLastMaxCount,
  onSetInfinity,
  isInfinity,
  onValueChange
}: VolumeInputProps) => {
  const { t } = useTranslation();
  const isFirstMinCount = index === 0 && field === "min_count";

  return (
    <div className="relative">
      <Input
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        {...control.register(`exchange_rates.${index}.${field}`, {
          valueAsNumber: true,
          onChange: (e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value) && onValueChange) {
              onValueChange(value);
            }
          }
        })}
        type="number"
        disabled={isInfinity || isFirstMinCount}
        className="bg-darkGray text-white text-base rounded-[35px] mobile:pl-12 pl-9 mobile:min-h-12 min-h-10 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm">
        {label}:
      </span>
      {isLastMaxCount && (
        <button
          type="button"
          onClick={onSetInfinity}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
            isInfinity ? 'text-mainColor' : 'text-white/50 hover:text-white'
          }`}
          title={t("Установить бесконечное значение")}
        >
          <Infinity size={20} />
        </button>
      )}
    </div>
  );
}; 