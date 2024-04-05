import { useDirectionsByCityQuery } from "@/entities/direction";
import { MyCity } from "@/entities/myCity";
import { CreateDirection, DirectionList } from "@/features/direction";
import { useAppSelector } from "@/shared/model";
import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { directionSchemaType } from "../../ui/myDirections";

interface DirectionsProps {
  form: UseFormReturn<directionSchemaType>;
}

export const Directions: FC<DirectionsProps> = ({ form }) => {
  const activeCityCodeName = form.getValues("activeCity.code_name");

  const {
    data: directions,
    isLoading,
    error,
  } = useDirectionsByCityQuery(activeCityCodeName, {
    skip: !activeCityCodeName,
  });

  useEffect(() => {
    if (directions) {
      form.setValue("directions", directions);
    }
    console.log(form.getValues());
  }, [directions]);

  return (
    <div className="mt-5 mb-5 grid grid-flow-row gap-5">
      <div className="text-2xl">Мои направления</div>
      <CreateDirection />
      {/* <DirectionList directions={form.getValues("directions")} /> */}
      <DirectionList directions={directions || []} />
    </div>
  );
};
