import { createTheme } from "@mui/material/styles";

const colors = {
  background: {
    primary: '#F2F2F2',
    secondary: '#F6F8FD',
  },
  accent: {
    primary: '#FF7E1B',
    secondary: '#FFAB6A',
  },
  text: {
    bold: '#1D2026',
    secondary: '#68707D',
  },
};


export const myTheme = createTheme({
    palette: {
        background: {
        default: colors.background.primary,
        paper: colors.background.secondary,
        },
        primary: {
            main: colors.background.primary,
        },
        secondary: {
          main: colors.accent.primary,
        },
        text: {
            primary: colors.text.bold,
            secondary: colors.text.secondary,
        },
    },
});