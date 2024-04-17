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

export const MyDirections = () => {
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

  const { data: directions, isLoading: directionsLoading } =
    useDirectionsByCityQuery(activeCity?.code_name || "", {
      skip: !activeCity,
    });

  useEffect(() => {
    if (directions) {
      form.setValue("directions", directions);
    }
  }, [directions]);

  const [
    editDireciton,
    { isLoading: editLoading, error: editError, isSuccess: editSuccess },
  ] = useEditDirectionMutation();

  const onSubmit = (data: directionSchemaType) => {
    if (activeCity) {
      const formData = {
        city: activeCity?.code_name,
        directions: data.directions,
      };
      editDireciton(formData)
        .unwrap()
        .then(() => {
          // toast
        })
        .catch((error) => console.error("Ошибка...", error));
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
          directionsLoading={directionsLoading}
          citiesLoading={citiesLoading}
        />
        {directions && directions?.length > 0 && (
          <EditDirection
            editError={editError && true}
            editLoading={editLoading}
            editSuccess={editSuccess}
          />
        )}
      </form>
      {activeCity &&
        directions &&
        directions.length > 0 &&
        activeCity.updated.date && <UpdatedInfo activeCity={activeCity} />}
    </Form>
  );
};
