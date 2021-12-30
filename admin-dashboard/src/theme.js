import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#113CFC",
      dark: "#193498",
      300: "#1597E5",
      200: "#69DADB",
    },
    neutral: {
      main: "#f7f7f7",
      gray: "#b8b8b8",
      dark: "#121212",
      transparent: "rgb(0,0,0,0.3)",
    },
  },
  typography: {
    fontFamily: ["Fira Sans", "Open Sans Condensed", "sans-serif"].join(","),
    fontSize: "1rem",
  },

});

export default theme;
