import { TextThemed } from "@/src/components/TextThemed";
import { renderWithTheme } from "../utils/renderWithTheme";

describe('TestThemed', () => {
    it('should render text provided as children', () => {
        const { getByText } = renderWithTheme(<TextThemed >
            Texto de Teste
        </TextThemed>);
        const textElement = getByText('Texto de Teste');
        expect(textElement).toBeOnTheScreen();
    });
});