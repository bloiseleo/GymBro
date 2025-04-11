import { useForm } from "@/src/hooks/useForm";
import { equalsTo, minLen, required } from "@/src/hooks/useForm/validations";
import { delay } from "@/src/utils/delay";
import { RegisterUser } from "@/src/views/RegisterUser";
import { useState } from "react";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const { formState: {
            username,
            confirmPassword,
            password
        }, onChangeFactory, onSubmit, getFormStatus } = useForm({
            username: {
                validations: [
                    required('Username'),
                    minLen('Username', 3)
                ],
                value: ''
            },
            password: {
                validations: [
                    required('Password'),
                    equalsTo('Password', 'confirmPassword', 'Confirm password'),
                    minLen('Password', 8)
                ],
                value: ''
            },
            confirmPassword: {
                validations: [
                    required('Confirm password'),
                    equalsTo('Confirm password', 'password', 'Password')
                ],
                value: ''
            }
        })
    const handleSubmit = () => {
        onSubmit(async data => {
            setLoading(true);
            try {
                console.log(data);
                await delay(2000);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })
    }
    return <RegisterUser
        loading={loading}
        confirmPassword={confirmPassword}
        onChangeConfirmPassword={onChangeFactory('confirmPassword')}
        onChangePassword={onChangeFactory('password')}
        onChangeUsername={onChangeFactory('username')}
        password={password}
        username={username}
        onSubmit={handleSubmit}
        status={getFormStatus()}
    />
}