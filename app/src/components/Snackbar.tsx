import { Animated, Pressable } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { TextThemed } from "./TextThemed";
import { Star } from "lucide-react-native";
import { useSnackbarContext } from "../contexts/SnackbarContext";

export const Snackbar = () => {
    const {
        inputBackgroundColor,
        inputTextColor
    } = useTheme();
    const { animatedValue, text } = useSnackbarContext();
    return <Animated.View style={{
        backgroundColor: inputBackgroundColor,
        position: 'absolute',
        height: 50,
        bottom: animatedValue,
        left: 45,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    }}>
        {
            text ? <TextThemed style={{
                color: inputTextColor,
                paddingRight: 20,
            }}>{text}</TextThemed> : <></>
        }
        <Star size={20} color={inputTextColor} />
    </Animated.View>
};