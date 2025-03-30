import { Pressable, TextInput, View } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { TextThemed } from "./TextThemed";
import Animated from 'react-native-reanimated';
import { inputTextColor } from "../constants/colors";
import { useRef, useState } from "react";
import { useAnimationControls } from "../hooks/useAnimationControls";
import { Eye, EyeClosed } from "lucide-react-native";

type Props = {
    label: string;
    value: string;
    onChangeValue: (newValue: string) => void;
    error?: boolean;
    errorText?: string;
    secure?: boolean;
    testId?: string;
}

const renderErrorText = (error: boolean, errorText?: string) => {
    const { errorColor } = useTheme();
    if (!error) {
        return;
    }
    return <TextThemed
        size={12}
        style={{
            color: errorColor,
            paddingLeft: 7,
            paddingTop: 4
        }}>
        {errorText ?? ''}
    </TextThemed>
}

const renderVisibilityButton = (secure: boolean, open: boolean, onPress: () => void) => {
    const { placeholderColor } = useTheme();
    if (!secure) return;
    return <Pressable onPress={onPress}>
        {open ? <Eye style={{
            position: 'absolute',
            top: 2,
            right: 16
        }} color={placeholderColor} size={16} /> : <EyeClosed style={{
            position: 'absolute',
            top: 2,
            right: 16
        }} color={placeholderColor} size={16}></EyeClosed>}
    </Pressable>

}

export const TextInputThemed = ({ label, value, onChangeValue, error = false, errorText, secure = false, testId }: Props) => {
    const [open, setOpen] = useState(false);
    const containerHeight = 40;
    const baseTopValue = containerHeight / 4
    const topValueDislocated = (-2 * baseTopValue) - 6;
    const inputRef = useRef<TextInput>(null);
    const {
        inputBackgroundColor,
        placeholderColor,
        borderColor,
        errorColor,
        backgroundErrorColor,
        fonts: {
            regular
        }
    } = useTheme();
    const {
        sharedValue,
        changeSharedValue,
        resetSharedValue
    } = useAnimationControls(baseTopValue, (_, isReset) => {
        if (isReset) return inputRef.current?.blur();
        return inputRef.current?.focus();
    });
    return <View>
        <Pressable
            testID={"pressable-text-input-themed"}
            style={{
                backgroundColor: error ? backgroundErrorColor : inputBackgroundColor,
                height: containerHeight,
                paddingLeft: 7,
                borderRadius: 6,
                justifyContent: 'center',
                borderColor,
                position: 'relative',
            }}
            onPress={() => {
                changeSharedValue(topValueDislocated);
            }}
        >
            <Animated.View style={{
                position: 'absolute',
                top: sharedValue,
            }}>
                <TextThemed selectable={false} style={{
                    color: error ? errorColor : placeholderColor,
                }}>{label}</TextThemed>
            </Animated.View>
            {renderVisibilityButton(secure, open, () => {
                setOpen(old => !old);
            })}
            <TextInput
                testID={testId ? testId : "text-input-themed"}
                onChangeText={onChangeValue}
                ref={inputRef}
                onBlur={() => {
                    if (value) return;
                    resetSharedValue();
                }}
                value={value}
                style={{
                    outline: 'none',
                    color: error ? errorColor : inputTextColor,
                    fontFamily: regular,
                    fontSize: 16
                }}
                secureTextEntry={secure && !open}
            />
        </Pressable>
        {renderErrorText(error, errorText)}
    </View>
}