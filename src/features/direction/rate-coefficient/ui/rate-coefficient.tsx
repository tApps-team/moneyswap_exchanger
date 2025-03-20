import { FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui"
import { useTranslation } from "react-i18next"
import { Control, UseFormReturn } from "react-hook-form"
import { DirectionAddSchemaType } from "@/entities/direction"
import { useEffect } from "react"

interface RateCoefficientProps {
  control: Control<DirectionAddSchemaType>
  form: UseFormReturn<DirectionAddSchemaType>
  index: number
  baseRate: { in_count: number; out_count: number } | null
}

export const RateCoefficient = ({ 
  control,
  form,
  index,
  baseRate,
}: RateCoefficientProps) => {
  const { t } = useTranslation()

  // Функция для расчета коэффициента
  const calculateRateCoefficient = (rate: any, baseRate: any): number => {
    if (!baseRate || !rate) return 1
    if (baseRate.in_count === 0 || baseRate.out_count === 0) return 1

    if (baseRate.in_count > baseRate.out_count) {
      return rate.in_count / baseRate.in_count
    }
    return rate.out_count / baseRate.out_count
  }

  // Функция для обновления курса на основе коэффициента
  const updateRateBasedOnCoefficient = (value: string | number) => {
    if (!baseRate) return

    const coefficient = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(coefficient) || !isFinite(coefficient)) return

    const currentRate = form.getValues(`exchange_rates.${index}`)
    if (!currentRate) return

    // Определяем по baseRate, какое значение нужно обновлять
    if (baseRate.in_count > baseRate.out_count) {
      const newInCount = baseRate.in_count * coefficient
      if (isFinite(newInCount)) {
        form.setValue(`exchange_rates.${index}.in_count`, newInCount)
      }
    } else {
      const newOutCount = baseRate.out_count * coefficient
      if (isFinite(newOutCount)) {
        form.setValue(`exchange_rates.${index}.out_count`, newOutCount)
      }
    }
  }

  // Эффект для отслеживания изменений курса
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!name) return

      // Проверяем, относится ли изменение к текущему курсу
      const currentRatePrefix = `exchange_rates.${index}`
      if (name.startsWith(currentRatePrefix) && 
          (name.endsWith('in_count') || name.endsWith('out_count'))) {
        
        const currentRate = value.exchange_rates?.[index]
        if (!currentRate) return

        const newCoefficient = calculateRateCoefficient(currentRate, baseRate)
        if (isFinite(newCoefficient)) {
          form.setValue(`exchange_rates.${index}.rate_coefficient`, newCoefficient)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [baseRate, index])

  return (
    <div className="w-full grid grid-cols-[0.42fr,1fr] mobile:gap-2 gap-1 items-center justify-stretch justify-items-center">
      <FormField
        control={control}
        name={`exchange_rates.${index}.rate_coefficient`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                disabled={index === 0}
                type="number"
                step="any"
                onChange={(e) => {
                  const value = e.target.value
                  field.onChange(value)
                  if (value !== '') {
                    updateRateBasedOnCoefficient(value)
                  }
                }}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                className="bg-darkGray text-white text-base rounded-[35px] mobile:min-h-12 min-h-10 focus-visible:ring-transparent focus-visible:ring-offset-0 text-center w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-white/90 text-sm font-medium w-full">
        {t("rate_coefficient")}
      </p>
    </div>
  )
}