import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./main.css";
import store from "./store/index.ts";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={(props) => (
          <Slide {...props} direction="left" timeout={800} />
        )}
        autoHideDuration={1500}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
