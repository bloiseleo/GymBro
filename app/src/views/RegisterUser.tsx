import { View } from "react-native"
import { SafeAreaViewThemed } from "../components/SafeAreaViewThemed"
import { Title } from "../components/Title"
import { Subtitle } from "../components/Subtitle"
import { UserIcon } from "../components/UserIcon"
import { TextInputThemed } from "../components/TextInputThemed"
import { FormEntry, FormStatus } from "../hooks/useForm/types"
import { ButtonThemed } from "../components/ButtonThemed"

type Props = {
    username: FormEntry,
    onChangeUsername: (value: string) => void,
    password: FormEntry,
    onChangePassword: (value: string) => void,
    confirmPassword: FormEntry,
    onChangeConfirmPassword: (value: string) => void
    onSubmit: () => void;
    loading: boolean;
    status: FormStatus;
}

export const RegisterUser = ({ username, password, confirmPassword, onChangeConfirmPassword, onChangePassword, onChangeUsername, onSubmit, loading, status }: Props) => {
    return <SafeAreaViewThemed>
        <View style={{
            alignItems: 'center',
            gap: 25
        }}>
            <View style={{
                alignItems: 'center',
                gap: 6
            }}>
                <Title>Welcome</Title>
                <Subtitle>Create your account</Subtitle>
            </View>
            <UserIcon />
        </View>
        <View style={{
            gap: 31,
            paddingHorizontal: 46
        }}>
            <TextInputThemed 
                testId="text-input-username"
                value={username.value as string}
                onChangeValue={onChangeUsername} 
                error={username.error.hasError}
                errorText={username.error.message}
                label="Username" />
            <TextInputThemed 
                testId="text-input-password"    
                secure={true}
                value={password.value as string}
                error={password.error.hasError}
                errorText={password.error.message}
                onChangeValue={onChangePassword} 
                label="Password" />
            <TextInputThemed
                testId="text-input-confirm-password"    
                secure={true}
                value={confirmPassword.value as string}
                onChangeValue={onChangeConfirmPassword}  
                label="Confirm password"
                error={confirmPassword.error.hasError}
                errorText={confirmPassword.error.message} />
            <ButtonThemed 
                testId="submit-button"
                onPress={onSubmit} 
                loading={loading}
                disabled={status === 'error'}
            >
                Create
            </ButtonThemed>
        </View>
    </SafeAreaViewThemed>
}