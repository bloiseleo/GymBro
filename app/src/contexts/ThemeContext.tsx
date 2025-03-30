import { appBackground, backgroundErrorColor, disabledButtonColor, errorColor, inputBackground, inputBorderColor, inputTextColor, placeHolderColor } from '@/src/constants/colors';
import { createContext, ReactNode, useContext } from 'react';
import { Theme, ThemeFonts } from '../types/theme';

const ThemeContext = createContext<Theme>({
    backgroundColor: 'default',
    fonts: {
        regular: 'default',
        light: 'default',
        semiBold: 'default'
    },
    inputTextColor: 'default',
    inputBackgroundColor: 'default',
    borderColor: 'default',
    placeholderColor: 'default',
    errorColor: 'default',
    backgroundErrorColor: 'default',
    disabledButtonColor: 'default'
});

export const useTheme = () => {
    return useContext(ThemeContext);
}

type Props = {
    children: ReactNode,
    fonts: ThemeFonts;
}

export const ThemeContextProvider = ({ children, fonts }: Props) => {
    return <ThemeContext.Provider value={{
        backgroundColor: appBackground,
        fonts,
        inputTextColor: inputTextColor,
        inputBackgroundColor: inputBackground,
        borderColor: inputBorderColor,
        placeholderColor: placeHolderColor,
        errorColor: errorColor,
        backgroundErrorColor: backgroundErrorColor,
        disabledButtonColor: disabledButtonColor
    }}>
        {children}
    </ThemeContext.Provider>
}
