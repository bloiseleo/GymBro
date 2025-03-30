import { ThemeContextProvider } from "@/src/contexts/ThemeContext";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useAppStartup } from "@/src/hooks/useAppStartup";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fonts = useAppStartup(() => {
    SplashScreen.hide();
  });
  return <ThemeContextProvider fonts={fonts}>
      <Stack 
        screenOptions={{
          headerShown: false
        }} 
      />
  </ThemeContextProvider>
}