import { BadRequest } from "@/src/api/response/base-api-response";
import { FieldErrorApi } from "@/src/api/response/field-error-api-response";
import { useSnackbar } from "@/src/contexts/SnackbarContext";
import { useForm } from "@/src/hooks/useForm";
import { equalsTo, minLen, required } from "@/src/hooks/useForm/validations";
import { useGymbroApi } from "@/src/hooks/useGymbroApi";
import { RegisterUser } from "@/src/views/RegisterUser";
import { useMemo, useState } from "react";

export default function RegisterPage() {
    const gymbroApi = useGymbroApi();
    const [loading, setLoading] = useState(false);
    const { show } = useSnackbar();
    const { formState: {
            username,
            confirmPassword,
            password
        }, onChangeFactory, setErrorFactory, onSubmit, status } = useForm({
            username: {
                validations: [
                    required('Username'),
                    minLen('Username', 3)
                ],
                value: undefined
            },
            password: {
                validations: [
                    required('Password'),
                    equalsTo('Password', 'confirmPassword', 'Confirm password'),
                    minLen('Password', 8)
                ],
                value: undefined
            },
            confirmPassword: {
                validations: [
                    required('Confirm password'),
                    equalsTo('Confirm password', 'password', 'Password')
                ],
                value: undefined
            }
        });
    const handleSubmit = () => {
        onSubmit(async data => {
            setLoading(true);
            try {
                const response = await gymbroApi.auth.signUp({
                    password: data.password as string,
                    username: data.username as string
                })             
                show(response.message);
            } catch(err) {
                if(err instanceof BadRequest) {
                    console.log(err.data);
                }
                if(err instanceof FieldErrorApi) {
                    show(err.data.message);
                    const fieldErrors = err.data.fieldErrors as any;
                    for(const key of Object.keys(fieldErrors)) {
                        const message = fieldErrors[key];
                        const setErrorField = setErrorFactory(key as "username" | "confirmPassword" | "password");
                        setErrorField(message);
                    }
                }
            } finally {
                setLoading(false);
            }
        })
    }
    const onChangeUsername = useMemo(() => onChangeFactory('username'), [])
    const onChangePassword = useMemo(() => onChangeFactory('password'), [])
    const onChangeConfirmPassword = useMemo(() => onChangeFactory('confirmPassword'), []);
    return <RegisterUser
        loading={loading}
        confirmPassword={confirmPassword}
        onChangeConfirmPassword={onChangeConfirmPassword}
        onChangePassword={onChangePassword}
        onChangeUsername={onChangeUsername}
        password={password}
        username={username}
        onSubmit={handleSubmit}
        status={status}
    />
}