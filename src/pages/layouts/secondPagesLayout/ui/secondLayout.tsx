import { ReactNode } from "react";
import styles from "./secondLayout.module.scss";
import { BackButton } from "@/features/backButton";

export const SecondLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className={styles.second__header}>
        header <BackButton />
      </header>
      {children}
    </>
  );
};
