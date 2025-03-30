import { useTheme } from "../contexts/ThemeContext";
import { TextThemed } from "./TextThemed";

type Props = {
    children: string;
}
export const Subtitle = ({ children }: Props) => {
    const { inputTextColor } = useTheme();
    return <TextThemed size={24} style={{
        color: inputTextColor
    }}>
        {children}
    </TextThemed>
}