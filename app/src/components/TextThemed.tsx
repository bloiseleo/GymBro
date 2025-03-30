import { StyleProp, Text, TextStyle } from "react-native"
import { useTheme } from "../contexts/ThemeContext";

type TextSize = 40 | 24 | 16 | 12

type TextFont = 'regular' | 'semiBold'

type Props = {
    children: string;
    style?: StyleProp<TextStyle>;
    size?: TextSize;
    selectable?: boolean;
    font?: TextFont;
}

const fontFactory = (font: TextFont) => {
    const { fonts: { 
        regular,
        semiBold
    } } = useTheme();
    switch(font) {
        case 'regular':
            return regular;
        case 'semiBold':
            return semiBold;
        default:
            return regular;
    }
}

export const TextThemed = ({ children, style, size = 16, selectable = true, font = 'regular'} : Props) => {
    return <Text selectable={selectable} style={[style, {
        fontSize: size,
        fontFamily: fontFactory(font),
    }]}>
        {children}
    </Text>
}