"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#17685d", dark: "#0f4f47", contrastText: "#ffffff" },
    secondary: { main: "#d69a42", dark: "#a96f20" },
    background: { default: "#f6f7f5", paper: "#ffffff" },
    text: { primary: "#102a2e", secondary: "#5b6b6d" },
    divider: "#e4e9e6",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.04 },
    h2: { fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.12 },
    h3: { fontWeight: 680, letterSpacing: "-0.025em" },
    h4: { fontWeight: 680, letterSpacing: "-0.02em" },
    h5: { fontWeight: 650, letterSpacing: "-0.012em" },
    button: { fontWeight: 650, textTransform: "none", letterSpacing: 0 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10, paddingInline: 20, minHeight: 44 } },
    },
    MuiCard: {
      styleOverrides: { root: { border: "1px solid #e4e9e6", boxShadow: "0 12px 32px rgba(16,42,46,0.06)" } },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 650 } } },
  },
});

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
