import { Animated } from "react-native";
import { useAnimatedValue } from "../useAnimatedValue";
import { useMemo } from "react";

type Config = {
    duration?: number;
}

export const useAnimationFadeInAndOut = (value: number, final: number, config: Config) => {
    const initial = useAnimatedValue(value).current;
    const toValueFinal = useMemo(() => Animated.timing(initial, {
        toValue: final,
        duration: config.duration ? config.duration : 5000,
        useNativeDriver: true
    }), [final, value]);
    const toValueInitial = useMemo(() => Animated.timing(initial, {
        toValue: value,
        duration: config.duration ? config.duration : 5000,
        useNativeDriver: true
    }), [final, value])
    return {
        fadeIn: (callback?: (result: Animated.EndResult) => void) => {
            toValueFinal.start(res => {
                if(callback) callback(res);
            });
        },
        fadeOut: (callback?: (result: Animated.EndResult) => void) => {
            toValueInitial.start((res) => {
                if(callback) callback(res);
            });
        },
        value: initial
    }
};