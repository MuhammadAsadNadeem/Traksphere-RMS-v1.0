import { createTheme } from "@mui/material/styles";
import { red, green, yellow, blue, deepPurple, purple } from "@mui/material/colors";

const primaryShades = Object.fromEntries(
  Object.entries(deepPurple).filter(([key]) => !isNaN(Number(key)))
);

const seconadryShades = Object.fromEntries(
  Object.entries(purple).filter(([key]) => !isNaN(Number(key)))
);

declare module "@mui/material/styles" {
  interface Theme {
    button: {
      backgroundColor: string;
      color: string;
      hoverBackgroundColor: string;
    };
    table: {
      backgroundColor: string;
      color: string;
    };
  }
  interface ThemeOptions {
    button?: {
      backgroundColor: string;
      color: string;
      hoverBackgroundColor: string;
    };
    table?: {
      backgroundColor: string;
      color: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryShades["500"],
      light: primaryShades["300"],
      dark: primaryShades["900"],
      contrastText: '#fff',
    },
    secondary: {
      main: seconadryShades["500"],
      light: seconadryShades["300"],
      dark: seconadryShades["900"],
    },
    error: { main: red[500] },
    success: { main: green[500] },
    warning: { main: yellow[500] },
    info: { main: blue[500] },
  },
  button: {
    backgroundColor: primaryShades["500"],
    color: " #ffffff",
    hoverBackgroundColor: primaryShades["300"],
  },
  table: {
    backgroundColor: primaryShades["50"],
    color: primaryShades["900"],
  },
});


export default theme;