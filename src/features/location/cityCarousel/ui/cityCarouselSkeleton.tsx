import { Carousel, CarouselContent, CarouselItem, Skeleton } from "@/shared/ui";

export const CityCarouselSkeleton = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Skeleton className="h-20 w-72 rounded-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
