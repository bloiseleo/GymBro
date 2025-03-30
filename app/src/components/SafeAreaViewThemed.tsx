import { useTheme } from "@/src/contexts/ThemeContext"
import { ReactNode } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
    children: ReactNode
}
export const SafeAreaViewThemed = ({ children }: Props) => {
    const { backgroundColor } = useTheme();
    return <SafeAreaView style={{
        backgroundColor,
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'space-around'
    }}>
        {children}
    </SafeAreaView>
}
