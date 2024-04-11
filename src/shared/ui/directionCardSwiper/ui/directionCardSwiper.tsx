import React, { FC, ReactNode, TouchEvent, useState } from "react";
import styles from "./directionCardSwiper.module.scss";

interface DirectionCardSwiperProps {
  onDelete?: () => void;
  children?: ReactNode;
}

export const DirectionCardSwiper: FC<DirectionCardSwiperProps> = ({
  onDelete,
  children,
}) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const handleSwipeStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleSwipeMove = (e: TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    // Ограничение смещения карточки на 100px влево
    const newOffsetX = Math.min(Math.max(deltaX, -100), 0);
    setOffsetX(newOffsetX);
  };

  const handleSwipeEnd = (e: TouchEvent) => {
    const currentX = e.changedTouches[0].clientX;
    const deltaX = currentX - startX;

    if (deltaX < -100) {
      setOffsetX(-100);
    } else {
      setOffsetX(0);
    }

    setStartX(0);
  };

  const handleSwipeRight = () => {
    if (offsetX === -100) {
      setOffsetX(0);
    }
  };

  return (
    <div className={styles.card__container}>
      <div
        onTouchStart={handleSwipeStart}
        onTouchMove={handleSwipeMove}
        onTouchEnd={handleSwipeEnd}
        onTouchCancel={handleSwipeRight}
        className={styles.card}
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        {children}
      </div>
      <div
        onClick={onDelete}
        className={styles.icon}
        // onTouchCancel={handleSwipeRight}
        // style={{ right: `${-100 - offsetX}px` }}
      >
        Иконка
      </div>
    </div>
  );
};
