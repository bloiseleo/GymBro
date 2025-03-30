import { RegisterUser } from "@/src/views/RegisterUser";
import { renderWithTheme } from "../utils/renderWithTheme";
import { FormEntry } from "@/src/hooks/useForm/types";
import { fireEvent } from "@testing-library/react-native";

describe('RegisterView', () => {
    it('should render form with username, password and Confirm Password', () => {
        const username: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const password: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const confirmPassword: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const onChangePassword = jest.fn();
        const onChangeUsername = jest.fn();
        const onChangeConfirmPassword = jest.fn();
        const onSubmit = jest.fn();

        const { getByText } = renderWithTheme(<RegisterUser
            username={username}   
            password={password}
            confirmPassword={confirmPassword}
            loading={false}
            onChangeConfirmPassword={onChangeConfirmPassword}
            onChangePassword={onChangePassword}
            onChangeUsername={onChangeUsername}
            onSubmit={onSubmit}
        />)
        
        const usernameLabel = getByText('Username');
        const passwordLabel = getByText('Password');
        const confirmPasswordLabel = getByText('Confirm password');
        expect(usernameLabel).toBeOnTheScreen();
        expect(passwordLabel).toBeOnTheScreen();
        expect(confirmPasswordLabel).toBeOnTheScreen();
    });
    it('should call onChangeUsername when change event is fired', () => {
        const username: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const password: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const confirmPassword: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const onChangePassword = jest.fn();
        const onChangeUsername = jest.fn();
        const onChangeConfirmPassword = jest.fn();
        const onSubmit = jest.fn();

        const { getByTestId } = renderWithTheme(<RegisterUser
            username={username}   
            password={password}
            confirmPassword={confirmPassword}
            loading={false}
            onChangeConfirmPassword={onChangeConfirmPassword}
            onChangePassword={onChangePassword}
            onChangeUsername={onChangeUsername}
            onSubmit={onSubmit}
        />)

        const usernameInput = getByTestId('text-input-username');
        expect(usernameInput).toBeOnTheScreen();
        fireEvent.changeText(usernameInput, 'testusername');
        expect(onChangeUsername).toHaveBeenCalledWith('testusername');
    });
    it('should call onChangePassword when change event is fired', () => {
        const username: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const password: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const confirmPassword: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const onChangePassword = jest.fn();
        const onChangeUsername = jest.fn();
        const onChangeConfirmPassword = jest.fn();
        const onSubmit = jest.fn();

        const { getByTestId } = renderWithTheme(<RegisterUser
            username={username}   
            password={password}
            confirmPassword={confirmPassword}
            loading={false}
            onChangeConfirmPassword={onChangeConfirmPassword}
            onChangePassword={onChangePassword}
            onChangeUsername={onChangeUsername}
            onSubmit={onSubmit}
        />)

        const passwordInput = getByTestId('text-input-password');
        expect(passwordInput).toBeOnTheScreen();
        fireEvent.changeText(passwordInput, 'testpassword');
        expect(onChangePassword).toHaveBeenCalledWith('testpassword');
    });
    it('should call onChangeConfirmPassword when change event is fired', () => {
        const username: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const password: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const confirmPassword: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const onChangePassword = jest.fn();
        const onChangeUsername = jest.fn();
        const onChangeConfirmPassword = jest.fn();
        const onSubmit = jest.fn();

        const { getByTestId } = renderWithTheme(<RegisterUser
            username={username}   
            password={password}
            confirmPassword={confirmPassword}
            loading={false}
            onChangeConfirmPassword={onChangeConfirmPassword}
            onChangePassword={onChangePassword}
            onChangeUsername={onChangeUsername}
            onSubmit={onSubmit}
        />)

        const confirmPasswordInput = getByTestId('text-input-confirm-password');
        expect(confirmPasswordInput).toBeOnTheScreen();
        fireEvent.changeText(confirmPasswordInput, 'testconfirmpassword');
        expect(onChangeConfirmPassword).toHaveBeenCalledWith('testconfirmpassword');
    });
    it('should call onSubmit when submit is fired', () => {
        const username: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const password: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const confirmPassword: FormEntry = {
            error: {
                message: '',
                hasError: false
            },
            value: '',
            validations: []
        }
        const onChangePassword = jest.fn();
        const onChangeUsername = jest.fn();
        const onChangeConfirmPassword = jest.fn();
        const onSubmit = jest.fn();

        const { getByTestId } = renderWithTheme(<RegisterUser
            username={username}   
            password={password}
            confirmPassword={confirmPassword}
            loading={false}
            onChangeConfirmPassword={onChangeConfirmPassword}
            onChangePassword={onChangePassword}
            onChangeUsername={onChangeUsername}
            onSubmit={onSubmit}
        />)

        const submitButton = getByTestId('submit-button');
        expect(submitButton).toBeOnTheScreen();
        fireEvent.press(submitButton);
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
});