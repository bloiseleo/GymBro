import { useTheme } from "../contexts/ThemeContext";
import { TextThemed } from "./TextThemed";

type Props = {
    children: string;
}
export const Title = ({ children }: Props) => {
    const { inputTextColor } = useTheme();
    
    return <TextThemed size={40} style={{
        color: inputTextColor
    }}>
        {children}
    </TextThemed>
}