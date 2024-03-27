import { Provider } from "react-redux";
import { setupStore } from "./storeProvider/appStore";

const store = setupStore();

export const withStore = (Component: React.FC) => {
  return () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
