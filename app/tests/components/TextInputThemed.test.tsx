import { TextInputThemed } from "@/src/components/TextInputThemed";
import { renderWithTheme } from "../utils/renderWithTheme";
import { fireEvent } from "@testing-library/react-native";
import * as useAnimationControlsModule from './../../src/hooks/useAnimationControls';

jest.mock('./../../src/hooks/useAnimationControls.ts', () => {
    const animationControlsMock = {
        sharedValue: jest.fn(),
        changeSharedValue: jest.fn(),
        resetSharedValue: jest.fn(),
    };

    return {
        useAnimationControls: () => animationControlsMock,
        __getMock__: () => animationControlsMock
    };
});

describe('TextInputThemed', () => {
    it('should render input label', () => {
        const onChangeValue = jest.fn();
        const { getByText } = renderWithTheme(<TextInputThemed
            label="Test"
            onChangeValue={onChangeValue}
            value=""
        />)

        const label = getByText('Test');
        expect(label).toBeOnTheScreen();
    });
    it('should trigger input on change when value changes', () => {
        const onChangeValue = jest.fn();
        const { getByTestId } = renderWithTheme(<TextInputThemed
            label="Test"
            onChangeValue={onChangeValue}
            value=""
        />)
        const textInput = getByTestId('text-input-themed');
        expect(textInput).toBeOnTheScreen();
        fireEvent.changeText(textInput, 'Hello World!');
        expect(onChangeValue).toHaveBeenCalledWith('Hello World!');
    });
    it('should show error when error and errorMessage is presented', () => {
        const onChangeValue = jest.fn();
        const { getByText } = renderWithTheme(<TextInputThemed
            label="Test"
            onChangeValue={onChangeValue}
            value=""
            error
            errorText="Some error test"
        />)
        const errorText = getByText('Some error test');
        expect(errorText).toBeOnTheScreen();
    });
    it('should not show error when error is defined, but no message', () => {
        const onChangeValue = jest.fn();
        const { queryByText } = renderWithTheme(<TextInputThemed
            label="Test"
            onChangeValue={onChangeValue}
            value=""
            error
        />)
        const errorText = queryByText('Some error test');
        expect(errorText).toBeNull();
    });
    it('should trigger changeSharedValue when pressing the input', () => {
        const { __getMock__ } = useAnimationControlsModule as any;
        const animationControlsMock = __getMock__();
        const onChangeValue = jest.fn();
        const { getByTestId } = renderWithTheme(<TextInputThemed
            label="Test"
            onChangeValue={onChangeValue}
            value=""
            error
        />)
        const pressableInput = getByTestId('pressable-text-input-themed');
        fireEvent.press(pressableInput);
        expect(animationControlsMock.changeSharedValue).toHaveBeenCalled();
    });
    it('should trigger resetSharedValue when the input goes out of focus', () => {
        const { __getMock__ } = useAnimationControlsModule as any;
        const animationControlsMock = __getMock__();
        const onChangeValue = jest.fn();
        const { getByTestId } = renderWithTheme(<TextInputThemed
            label="Test"
            onChangeValue={onChangeValue}
            value=""
        />)
        const textInput = getByTestId('text-input-themed');
        fireEvent.press(textInput)
        fireEvent(textInput, 'blur');
        expect(animationControlsMock.resetSharedValue).toHaveBeenCalled();
    });
});