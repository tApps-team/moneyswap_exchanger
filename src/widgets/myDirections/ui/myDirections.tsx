import { Cities } from "../cities";
import { Directions } from "../directions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui";
import {
  directionSchema,
  directionSchemaType,
  useDirectionsByCityQuery,
  useEditDirectionMutation,
} from "@/entities/direction";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import {
  ActiveCity,
  setActiveCity,
  useGetCitiesQuery,
} from "@/entities/location";
import { EditDirection, UpdatedInfo } from "@/features/direction";
import { useToast } from "@/shared/ui/toast";
import { formattedDate, formattedTime } from "@/shared/lib";
import { useTranslation } from "react-i18next";

export const MyDirections = () => {
  const { t } = useTranslation();
  const activeCity = useAppSelector((state) => state.activeCity.activeCity);
  const dispatch = useAppDispatch();
  const setActive = (city: ActiveCity) => {
    dispatch(setActiveCity(city));
  };

  const { data: cities, isLoading: citiesLoading } = useGetCitiesQuery();

  useEffect(() => {
    if (cities && !activeCity) {
      setActive(cities[0]);
    }
  }, [cities]);

  const form = useForm<directionSchemaType>({
    resolver: zodResolver(directionSchema),
    defaultValues: {
      directions: [],
    },
  });
  form.watch(["directions"]);

  const {
    data: directions,
    isLoading: directionsLoading,
    isFetching: directionsFetching,
  } = useDirectionsByCityQuery(activeCity?.code_name || "", {
    skip: !activeCity,
  });

  useEffect(() => {
    if (directions) {
      form.setValue("directions", directions);
    }
  }, [directions]);

  const [editDirection, { isLoading: editLoading }] =
    useEditDirectionMutation();

  const { toast } = useToast();

  const onSubmit = (data: directionSchemaType) => {
    if (activeCity) {
      const hasEqualCounts = data.directions.some(
        (direction) => direction.in_count === direction.out_count
      );
      if (hasEqualCounts) {
        toast({
          title: t("Курсы не могут быть равны"),
          variant: "destructive",
        });
      } else {
        const updatedDirections = data.directions.map((direction) => {
          let in_count = direction.in_count;
          let out_count = direction.out_count;

          if (in_count > out_count) {
            out_count = 1;
            in_count = direction.in_count / direction.out_count;
          } else {
            in_count = 1;
            out_count = direction.out_count / direction.in_count;
          }

          return {
            ...direction,
            in_count,
            out_count,
          };
        });
        const formData = {
          city: activeCity?.code_name,
          directions: updatedDirections,
        };
        editDirection(formData)
          .unwrap()
          .then(() => {
            const date = new Date();
            const currentDate = formattedDate(date);
            const currentTime = formattedTime(date);
            setActive({
              code_name: activeCity.code_name,
              country: activeCity.country,
              country_flag: activeCity.country_flag,
              id: activeCity.id,
              info: activeCity.info,
              name: activeCity.name,
              updated: {
                date: currentDate,
                time: currentTime,
              },
            });

            toast({
              title: t("Направления успешно обновлены"),
              description: "",
              variant: "success",
            });
          })
          .catch((error) => {
            console.error("Ошибка...", error);
            toast({
              title: t("Что-то пошло не так..."),
              description: t("При обновлении произошла ошибка"),
              variant: "destructive",
            });
          });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Cities
          cities={cities || []}
          setActive={setActive}
          activeCity={activeCity}
          directionsLoading={directionsLoading}
          citiesLoading={citiesLoading}
        />
        <Directions
          directions={directions || []}
          form={form}
          directionsLoading={directionsFetching}
          citiesLoading={citiesLoading}
        />
        {directions && directions?.length > 0 && (
          <EditDirection editLoading={editLoading} />
        )}
      </form>
      {activeCity &&
        directions &&
        directions.length > 0 &&
        activeCity.updated.date && <UpdatedInfo activeCity={activeCity} />}
    </Form>
  );
};
