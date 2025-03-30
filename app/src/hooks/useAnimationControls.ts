import { useSharedValue, withTiming } from "react-native-reanimated";

export const useAnimationControls = (
    initialSharedValue: number,
    onChangeSharedValue?: (value: number, isReset: boolean) => void,
) => {
    const sharedValue = useSharedValue(initialSharedValue);
    const changeSharedValue = (value: number, isReset?: boolean) => {
        sharedValue.value = withTiming(value, {
            duration: 100
        });
        if(onChangeSharedValue) onChangeSharedValue(value, isReset ?? false);
    }
    const resetSharedValue = () => {
        changeSharedValue(initialSharedValue, true);
    }
    return {
        sharedValue,
        changeSharedValue,
        resetSharedValue
    }
}