import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Snackbar } from "../components/Snackbar";
import { useAnimationFadeInAndOut } from "../hooks/useAnimationFadeInAndOut";
import { Animated } from "react-native";

type TSnackbarContext = {
    open: boolean;
    bottomInitial: number;
    bottomFinal: number;
    animatedValue: Animated.Value;
    text?: string;
    show: (text: string) => void;
};

const SnackbarContext = createContext<TSnackbarContext>({
    open: false,
    bottomFinal: 40,
    bottomInitial: -80,
    animatedValue: new Animated.Value(0),
    show: (text) => {},
});

export const useSnackbarContext = () => {
    return useContext(SnackbarContext);
}

export const useSnackbar = () => {
    const { show } = useContext(SnackbarContext);
    return { show };
}

export const SnackbarContextProvider = ({children}: { children: ReactNode}) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState<string | undefined>(undefined);
    const bottomFinal = 40;
    const bottomInitial = -80;

    const { fadeIn, fadeOut, value } = useAnimationFadeInAndOut(bottomInitial, bottomFinal, {
        duration: 500
    })

    const show = (text: string, duration?: number) => {
        setText(text);
        setOpen(true);
        fadeIn();
        closeInternal(duration);
    }

    const closeInternal = (duration?: number) => {
        setTimeout(() => {
            fadeOut(() => {
                setOpen(false);
                setText(undefined);
            });
        }, duration ?? 5000);
    }
    
    return <SnackbarContext.Provider value={{
        open,
        bottomFinal: 40,
        bottomInitial: -80,
        animatedValue: value,
        text,
        show
    }}>
        {children}
        <Snackbar />
    </SnackbarContext.Provider>
}