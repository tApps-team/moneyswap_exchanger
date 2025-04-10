import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Locations } from "../locations";
import { Directions } from "../directions";
import { NonCashBtn } from "@/features/non-cash";
import { EditDirection, UpdatedInfo } from "@/features/direction";
import {
  directionSchema,
  directionSchemaType,
  useDirectionsByQuery,
  useDirectionsByNoncashQuery,
  useEditDirectionMutation,
  useEditNoncashDirectionMutation,
} from "@/entities/direction";
import {
  ActiveLocation,
  setActiveLocation,
  setNonCash,
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "@/entities/location";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import { LocationMarker } from "@/shared/types";
import { formattedDate, formattedTime } from "@/shared/lib";
import { Form, useToast } from "@/shared/ui";

export const MyDirections = () => {
  const { t } = useTranslation();
  const {activeLocation, nonCash} = useAppSelector(
    (state) => state.activeLocation
  );
  const dispatch = useAppDispatch();
  const setActive = (location: ActiveLocation) => {
    dispatch(setActiveLocation(location));
    dispatch(setNonCash(false));
  };

  // activeLocation -> null
  const handleNonCash = () => {
    dispatch(setNonCash(true));
    dispatch(setActiveLocation(null));
  };

  const { data: cities, isLoading: citiesLoading } = useGetCitiesQuery();
  const { data: countries, isLoading: countriesLoading } =
    useGetCountriesQuery();

  useEffect(() => {
    if (!activeLocation && !nonCash) {
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
      skip: !activeLocation || nonCash,
    }
  );

  const {
    data: directionsNoncash,
    isLoading: directionsNoncashLoading,
    isFetching: directionsNoncashFetching,
  } = useDirectionsByNoncashQuery(undefined, {
    skip: !nonCash,
  });

  useEffect(() => {
    const currentDirections = !nonCash ? directions : directionsNoncash;
      const formattedDirections = (currentDirections || []).map(dir => ({
      ...dir,
        exchange_rates: dir.exchange_rates?.map(rate => ({
          ...rate,
        id: rate.id ?? null,
        min_count: rate.min_count ?? null,
        max_count: rate.max_count ?? null
        })) || null
      }));
      form.setValue("directions", formattedDirections);
  }, [directions, directionsNoncash, nonCash]);

  const [editDirection, { isLoading: editLoading }] =
    useEditDirectionMutation();
  const [editNoncashDirection, { isLoading: editNoncashLoading }] =
    useEditNoncashDirectionMutation();

  const { toast } = useToast();

  const onSubmit = (data: directionSchemaType) => {
    const updatedDirections = data.directions.map((direction) => {
      let { exchange_rates } = direction;

      if (exchange_rates && exchange_rates.length > 0) {
        if (exchange_rates.length === 1) {
          exchange_rates = [{
            ...exchange_rates[0],
            min_count: null,
            max_count: null
          }];
        } else {
          exchange_rates = exchange_rates.map((rate, index, array) => {
            if (index === array.length - 1) {
              return { ...rate, max_count: null };
            }
            return rate;
          });
        }

        exchange_rates = exchange_rates.map(rate => {
          let { in_count, out_count } = rate;

          if (in_count === out_count) {
            in_count = 1;
            out_count = 1;
          } else if (in_count > out_count && in_count !== 1 && out_count !== 1) {
            out_count = 1;
            in_count = rate.in_count / rate.out_count;
          } else if (in_count === 1 || out_count === 1) {
            in_count = rate.in_count;
            out_count = rate.out_count;
          } else if (in_count < out_count && in_count !== 1 && out_count !== 1) {
            in_count = 1;
            out_count = rate.out_count / rate.in_count;
          }

          return {
            ...rate,
            in_count,
            out_count,
            rate_coefficient: rate.rate_coefficient ?? 1
          };
        });
      }

      return {
        ...direction,
        exchange_rates
      };
    });

    const formData = {
      directions: updatedDirections.map(dir => ({
        id: dir.id,
        is_active: dir.is_active,
        exchange_rates: dir.exchange_rates?.map(rate => ({
          id: rate.id ?? null,
          min_count: rate.min_count,
          max_count: rate.max_count,
          in_count: rate.in_count,
          out_count: rate.out_count,
          rate_coefficient: rate.rate_coefficient ?? 1
        })) ?? null
      }))
    };

    if (formData.directions.length === 0) {
      return;
    }

    const editPromise = nonCash ? editNoncashDirection(formData) : activeLocation && editDirection({...formData, id: activeLocation.id, marker: activeLocation.code_name ? LocationMarker.city : LocationMarker.country});

    editPromise && editPromise
      .unwrap()
      .then(() => {
        if (activeLocation && !nonCash) {
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
        }

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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Locations
          locations={cities || []}
          setActive={setActive}
          activeLocation={activeLocation}
          directionsLoading={directionsLoading || directionsNoncashLoading}
          locationsLoading={citiesLoading || countriesLoading}
          isCountry={false}
        />
        {countries && countries?.length > 0 && (
          <Locations
            locations={countries || []}
            setActive={setActive}
            activeLocation={activeLocation}
            directionsLoading={directionsLoading || directionsNoncashLoading}
            locationsLoading={citiesLoading || countriesLoading}
            isCountry={true}
          />
        )}
        <NonCashBtn isActive={nonCash} setNonCash={handleNonCash}/>
        <Directions
          directions={!nonCash ? directions || [] : directionsNoncash || []}
          form={form}
          directionsLoading={directionsFetching || directionsNoncashFetching}
          locationsLoading={citiesLoading || countriesLoading}
        />
        {directions && directions?.length > 0 && (
          <EditDirection editLoading={editLoading || editNoncashLoading} />
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
