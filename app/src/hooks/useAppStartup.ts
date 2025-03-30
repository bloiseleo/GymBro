import { Inter_100Thin, Inter_400Regular, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { useEffect } from "react";
import { ThemeFonts } from "../types/theme";

export const useAppStartup = (onAppReady?: () => void): ThemeFonts => {
    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_100Thin
    });
    useEffect(() => {
        if(fontsLoaded) {
            if(onAppReady) onAppReady();
        }
    }, [fontsLoaded]);

    return {
        light: 'Inter_100Thin',
        regular: 'Inter_400Regular',
        semiBold: 'Inter_600SemiBold'
    };
}
