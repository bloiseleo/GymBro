import { ReactNode } from "react"
import { render } from '@testing-library/react-native';
import { ThemeContextProvider } from "@/src/contexts/ThemeContext";
  
export const renderWithTheme = (children: ReactNode) => {
    return render(
        <ThemeContextProvider fonts={{
            regular: 'default',
            light: 'default',
            semiBold: 'default'
        }}>
            {children}
        </ThemeContextProvider>
    )
}