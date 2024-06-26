import { ActiveCity, MyCityCard } from "@/entities/location";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { CitySkeleton } from "./citySkeleton";

interface CityCarouselProps {
  cities: ActiveCity[];
  setActive: (city: ActiveCity) => void;
  activeCity: ActiveCity | null;
  directionsLoading: boolean;
  citiesLoading: boolean;
}

export const CityCarousel: FC<CityCarouselProps> = ({
  cities,
  setActive,
  activeCity,
  directionsLoading,
  citiesLoading,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();

  const scrollToActiveCity = async () => {
    if (cities.length > 0 && api && activeCity) {
      const index = cities.findIndex((city) => city.id === activeCity.id);
      await new Promise((resolve) => setTimeout(resolve, 0));
      api.scrollTo(index);
    }
  };

  useEffect(() => {
    scrollToActiveCity();
  }, [api, activeCity, cities]);

  return (
    <Carousel
      ref={carouselRef}
      opts={{
        align: "start",
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {directionsLoading || citiesLoading ? (
          <>
            <CarouselItem>
              <CitySkeleton />
            </CarouselItem>
            <CarouselItem>
              <CitySkeleton />
            </CarouselItem>
          </>
        ) : (
          cities?.map((city) => (
            <CarouselItem key={city.id}>
              <MyCityCard
                city={city}
                onClick={() => {
                  setActive(city);
                }}
                activeCity={activeCity?.id === city?.id}
              />
            </CarouselItem>
          ))
        )}
      </CarouselContent>
    </Carousel>
  );
};
