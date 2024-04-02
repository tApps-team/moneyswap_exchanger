import { IosPickerItem } from "@/features/timePicker/ui/timePicker";
import styles from "./timeSelect.module.scss";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui";
export const TimeSelect = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="w-full justify-between items-center rounded-full gap-2 select-none"
          variant={"outline"}
        >
          Выбрать время
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader>
          <DrawerTitle>
            Выберите время в которой будет размещен обменик
          </DrawerTitle>
        </DrawerHeader>

        <div className={styles.embla}>
          <IosPickerItem
            slideCount={24}
            perspective="left"
            loop={true}
            label="hours"
          />
          <IosPickerItem
            slideCount={60}
            perspective="right"
            loop={true}
            label="min"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
