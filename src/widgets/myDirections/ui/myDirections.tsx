import { Cities } from "../cities";
import { Directions } from "../directions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui";
import {
  directionSchema,
  directionSchemaType,
  useDirectionsByCityQuery,
} from "@/entities/direction";
import { MyCity, setMyCity, useGetCitiesQuery } from "@/entities/myCity";
import { useEffect } from "react";
import styles from "./myDirections.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/model";

export const MyDirections = () => {
  const activeCity = useAppSelector((state) => state.myCity.activeCity);
  const dispatch = useAppDispatch();
  const setActiveCity = (city: MyCity) => {
    dispatch(setMyCity(city));
  };

  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useGetCitiesQuery();

  useEffect(() => {
    if (cities) {
      setActiveCity(cities[0]);
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
    isLoading,
    error,
  } = useDirectionsByCityQuery(activeCity?.code_name || "", {
    skip: !activeCity,
  });

  useEffect(() => {
    if (directions) {
      form.setValue("directions", directions);
    }
  }, [directions]);

  const onSubmit = (data: directionSchemaType) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="grid" onSubmit={form.handleSubmit(onSubmit)}>
          <Cities cities={cities || []} setActiveCity={setActiveCity} />
          {directions && <Directions directions={directions} form={form} />}
          <button className={styles.submit_btn}>Обновить</button>
        </form>
      </Form>
    </div>
  );
};
