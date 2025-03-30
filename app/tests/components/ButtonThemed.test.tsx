import { ButtonThemed } from "@/src/components/ButtonThemed";
import { renderWithTheme } from "../utils/renderWithTheme";
import { waitFor } from "@testing-library/react-native";

describe('ButtonThemed', () => {
    it('should render button with text', () => {
        const onPress = jest.fn();
        const { getByText } = renderWithTheme(
            <ButtonThemed 
                onPress={onPress}>
                    Test button
            </ButtonThemed>
        )
        const button = getByText('Test button');
        expect(button).toBeOnTheScreen();
    });
    it('should render button with activity indicator when loading', async () => {
        const onPress = jest.fn();
        const { getByTestId, queryByText } = renderWithTheme(
            <ButtonThemed 
                loading
                onPress={onPress}>
                    Test button
            </ButtonThemed>
        )
        const activityIndicator = await waitFor(() => getByTestId('activity-indicator-button-themed'));
        expect(activityIndicator).toBeOnTheScreen();
        expect(queryByText('Test button')).toBeNull();
    })
});