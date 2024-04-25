import React, { FC, ReactNode, TouchEvent, useState } from "react";
import styles from "./directionCardSwiper.module.scss";

interface DirectionCardSwiperProps {
  children?: ReactNode;
  isActive: boolean;
}

export const DirectionCardSwiper: FC<DirectionCardSwiperProps> = ({
  children,
  isActive,
}) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const handleSwipeStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleSwipeMove = (e: TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    const newOffsetX = Math.min(Math.max(deltaX, -70), 0);
    setOffsetX(newOffsetX);
  };

  const handleSwipeEnd = (e: TouchEvent) => {
    const currentX = e.changedTouches[0].clientX;
    const deltaX = currentX - startX;

    if (deltaX < -70) {
      setOffsetX(-70);
    } else {
      setOffsetX(0);
    }

    setStartX(0);
  };

  const handleSwipeRight = () => {
    if (offsetX === -70) {
      setOffsetX(0);
    }
  };

  return (
    <div
      className={`${styles.card} ${!isActive && styles.not_active}`}
      onTouchStart={handleSwipeStart}
      onTouchMove={handleSwipeMove}
      onTouchEnd={handleSwipeEnd}
      onTouchCancel={handleSwipeRight}
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {children}
    </div>
  );
};
