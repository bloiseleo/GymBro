import { ThemeContextProvider } from "@/src/contexts/ThemeContext";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useAppStartup } from "@/src/hooks/useAppStartup";
import { Snackbar } from "@/src/components/Snackbar";
import { SnackbarContextProvider } from "@/src/contexts/SnackbarContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fonts = useAppStartup(() => {
    SplashScreen.hide();
  });
  return <ThemeContextProvider fonts={fonts}>
    <SnackbarContextProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
      <Snackbar />
    </SnackbarContextProvider>

  </ThemeContextProvider>
}