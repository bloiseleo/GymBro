import { useRef } from "react"
import { Animated } from "react-native"

export const useAnimatedValue = (value: number) => {
    const animatedValue = useRef(new Animated.Value(value));
    return animatedValue;
}