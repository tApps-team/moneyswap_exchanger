import React, { FC, ReactNode, TouchEvent, useEffect, useState } from "react";
import styles from "./directionCardSwiper.module.scss";

interface DirectionCardSwiperProps {
  children?: ReactNode;
  isActive: boolean;
  cardId: number;
}

export const DirectionCardSwiper: FC<DirectionCardSwiperProps> = ({
  children,
  isActive,
  cardId,
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

    if (deltaX < -15) {
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

  const handleClickOutside = (e: MouseEvent) => {
    e.stopPropagation();
    const cardElement = e.target as HTMLElement;
    const isOutsideCard = !cardElement.classList.contains(`card-${cardId}`);
    if (isOutsideCard) {
      setOffsetX(0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${styles.card} card-${cardId} ${
        !isActive && styles.not_active
      }`}
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
