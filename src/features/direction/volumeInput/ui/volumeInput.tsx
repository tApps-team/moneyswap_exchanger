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
}

export const VolumeInput = ({ 
  control, 
  index, 
  field, 
  label, 
  isLastMaxCount,
  onSetInfinity,
  isInfinity 
}: VolumeInputProps) => {
  const { t } = useTranslation();
  const isFirstMinCount = index === 0 && field === "min_count";

  return (
    <div className="relative">
      <Input
      onWheel={(e) => (e.target as HTMLInputElement).blur()}
        {...control.register(`exchange_rates.${index}.${field}`, {
          valueAsNumber: true
        })}
        type="number"
        disabled={isInfinity || isFirstMinCount}
        className="bg-darkGray text-white text-base rounded-[35px] pl-12 min-h-12 focus-visible:ring-transparent focus-visible:ring-offset-0"
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