// import { BrowserRouter } from "react-router-dom";

import { router } from "@/pages/router";
import { RouterProvider } from "react-router-dom";

// export const withRouter = (Component: React.FC) => {
//   return () => (
//     <BrowserRouter>
//       <Component />
//     </BrowserRouter>
//   );
// };

export const withRouter = () => {
  return () => <RouterProvider router={router} />;
};
