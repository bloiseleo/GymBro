import { CircleUserRound } from "lucide-react-native"
import { useTheme } from "../contexts/ThemeContext"

export const UserIcon = () => {
    const { inputTextColor } = useTheme();
    return <CircleUserRound
        strokeWidth={.3}
        color={inputTextColor}
        size={154}
    ></CircleUserRound>
}