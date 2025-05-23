import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { PublicRoutes, PrivateRoutes } from "./routes";
import Public from "./layouts/public";
import Private from "./layouts/private";
import { theme } from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children: PublicRoutes,
  },
  {
    path: "/",
    element: <Private />,
    children: PrivateRoutes,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
