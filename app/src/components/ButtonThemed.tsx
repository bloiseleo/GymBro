import { ActivityIndicator, TouchableOpacity } from "react-native"
import { TextThemed } from "./TextThemed";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    loading?: boolean;
    children: string;
    onPress: () => void;
    testId?: string;
    disabled?: boolean;
}

export const ButtonThemed = ({ children, onPress, loading = false, testId, disabled }: Props) => {
    const {
        inputTextColor,
        backgroundColor,
        disabledButtonColor
    } = useTheme();
    return <TouchableOpacity
        testID={testId}
        style={{
            backgroundColor: (loading || disabled) ? disabledButtonColor : inputTextColor,
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            borderRadius: 6,
            cursor: 'pointer'
        }}
        onPress={onPress}
        disabled={loading || disabled}
    >
        {
            loading ? <ActivityIndicator testID="activity-indicator-button-themed" size={18} color={backgroundColor} /> : <TextThemed selectable={false} size={16} font="semiBold">
                {children}
            </TextThemed>
        }
    </TouchableOpacity>
}