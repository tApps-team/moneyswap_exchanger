import { Locations } from "../locations";
import { Directions } from "../directions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui";
import {
  directionSchema,
  directionSchemaType,
  useDirectionsByQuery,
  useEditDirectionMutation,
} from "@/entities/direction";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import {
  ActiveLocation,
  setActiveLocation,
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "@/entities/location";
import { EditDirection, UpdatedInfo } from "@/features/direction";
import { useToast } from "@/shared/ui/toast";
import { formattedDate, formattedTime } from "@/shared/lib";
import { useTranslation } from "react-i18next";
import { LocationMarker } from "@/shared/types";

export const MyDirections = () => {
  const { t } = useTranslation();
  const activeLocation = useAppSelector(
    (state) => state.activeLocation.activeLocation
  );
  const dispatch = useAppDispatch();
  const setActive = (location: ActiveLocation) => {
    dispatch(setActiveLocation(location));
  };

  const { data: cities, isLoading: citiesLoading } = useGetCitiesQuery();
  const { data: countries, isLoading: countriesLoading } =
    useGetCountriesQuery();

  useEffect(() => {
    if (!activeLocation) {
      if (cities && cities.length) {
        setActive(cities[0]);
      } else if (countries) {
        setActive(countries[0]);
      }
    }
  }, [cities, countries]);

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
  } = useDirectionsByQuery(
    {
      id: activeLocation?.id || -1,
      marker: activeLocation?.code_name
        ? LocationMarker.city
        : LocationMarker.country,
    },
    {
      skip: !activeLocation,
    }
  );

  useEffect(() => {
    if (directions) {
      form.setValue("directions", directions);
    }
  }, [directions]);

  const [editDirection, { isLoading: editLoading }] =
    useEditDirectionMutation();

  const { toast } = useToast();

  const onSubmit = (data: directionSchemaType) => {
    if (activeLocation) {
      const updatedDirections = data.directions.map((direction) => {
        let { in_count, out_count } = direction;

        if (in_count === out_count) {
          in_count = 1;
          out_count = 1;
        } else if (in_count > out_count && in_count !== 1 && out_count !== 1) {
          out_count = 1;
          in_count = direction.in_count / direction.out_count;
        } else if (in_count === 1 || out_count === 1) {
          in_count = direction.in_count;
          out_count = direction.out_count;
        } else if (in_count < out_count && in_count !== 1 && out_count !== 1) {
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
        id: activeLocation.id,
        marker: activeLocation?.code_name
          ? LocationMarker.city
          : LocationMarker.country,
        directions: updatedDirections,
      };
      editDirection(formData)
        .unwrap()
        .then(() => {
          const date = new Date();
          const currentDate = formattedDate(date);
          const currentTime = formattedTime(date);
          setActive({
            ...activeLocation,
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Locations
          locations={cities || []}
          setActive={setActive}
          activeLocation={activeLocation}
          directionsLoading={directionsLoading}
          locationsLoading={citiesLoading || countriesLoading}
          isCountry={false}
        />
        {countries && countries?.length > 0 && (
          <Locations
            locations={countries || []}
            setActive={setActive}
            activeLocation={activeLocation}
            directionsLoading={directionsLoading}
            locationsLoading={citiesLoading || countriesLoading}
            isCountry={true}
          />
        )}
        <Directions
          directions={directions || []}
          form={form}
          directionsLoading={directionsFetching}
          locationsLoading={citiesLoading || countriesLoading}
        />
        {directions && directions?.length > 0 && (
          <EditDirection editLoading={editLoading} />
        )}
      </form>
      {activeLocation &&
        directions &&
        directions.length > 0 &&
        activeLocation?.updated?.date && (
          <UpdatedInfo activeLocation={activeLocation} />
        )}
    </Form>
  );
};
