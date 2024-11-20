import { ActiveLocation, MyLocationCard } from "@/entities/location";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { LocationSkeleton } from "./locationSkeleton";
import { useTranslation } from "react-i18next";

interface LocationCarouselProps {
  locations: ActiveLocation[];
  setActive: (location: ActiveLocation) => void;
  activeLocation: ActiveLocation | null;
  directionsLoading: boolean;
  locationsLoading: boolean;
  isCountry?: boolean;
}

export const LocationCarousel: FC<LocationCarouselProps> = ({
  locations,
  setActive,
  activeLocation,
  directionsLoading,
  locationsLoading,
  isCountry,
}) => {
  const { t } = useTranslation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();

  const scrollToActiveCity = async () => {
    if (locations.length > 0 && api && activeLocation) {
      const cityIndex = locations.findIndex(
        (location) => location.code_name === activeLocation.code_name
      );
      const countryIndex = locations.findIndex(
        (location) => location.id === activeLocation.id
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      api.scrollTo(isCountry ? countryIndex : cityIndex);
    }
  };

  useEffect(() => {
    scrollToActiveCity();
  }, [api, activeLocation, locations]);

  return (
    <Carousel
      ref={carouselRef}
      opts={{
        align: "start",
      }}
      setApi={setApi}
    >
      <CarouselContent className="">
        {directionsLoading || locationsLoading ? (
          <>
            <CarouselItem>
              <LocationSkeleton />
            </CarouselItem>
            <CarouselItem>
              <LocationSkeleton />
            </CarouselItem>
          </>
        ) : (
          <>
            {locations?.map((location) => (
              <CarouselItem key={location.id} className="">
                <MyLocationCard
                  location={location}
                  onClick={() => {
                    setActive(location);
                  }}
                  activeLocation={
                    isCountry
                      ? !activeLocation?.code_name &&
                        activeLocation?.id === location?.id
                      : activeLocation?.code_name === location?.code_name
                  }
                />
              </CarouselItem>
            ))}
            {locations?.length === 1 && (
              <CarouselItem className="">
                <div className="w-full bg-black"></div>
              </CarouselItem>
            )}
            {locations?.length === 0 && (
              <CarouselItem className="h-[70px] grid justify-start items-center">
                <p className="uppercase text-white font-medium text-sm">
                  {t("Нужно добавить город...")}
                </p>
              </CarouselItem>
            )}
          </>
        )}
      </CarouselContent>
    </Carousel>
  );
};
