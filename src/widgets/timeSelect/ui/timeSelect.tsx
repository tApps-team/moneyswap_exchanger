import { IosPickerItem } from "@/features/timePicker/ui/timePicker";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui";
import styles from "./timeSelect.module.scss";
import { ChevronDown } from "lucide-react";
export const TimeSelect = () => {
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="w-[103px] h-[38px] justify-between items-center rounded-full gap-2 select-none"
          variant={"outline"}
        >
          <div>12:00</div>
          <ChevronDown />
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
