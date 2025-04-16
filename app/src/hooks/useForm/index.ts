import { useMemo, useReducer, useState } from "react"
import { FormAction, FormActionChange, FormActions, FormInitialState, FormState, FormActionSubmit, OnSubmit, FormInitialEntry, FormActionSetError } from "./types";
import { changeAction, checkFormStatus, setErrorAction, submitAction } from "./actions";

const formReducer = <T>(current: FormState<T>, action: FormAction<any>) => {
    switch(action.constructor) {
        case FormActionChange:
            return changeAction(action, current);
        case FormActionSubmit:
            return submitAction(action, current);
        case FormActionSetError:
            return setErrorAction(action, current);
        default:
            throw new Error(`action of type [${action.constructor.name}] was not recognized`)
    }
}

const createState = <T>(initial: FormInitialState<T>): FormState<T> => {
    const data: FormState<T> = {} as FormState<T>;
    for(let prop in initial) {
        const { validations, value } = initial[prop];
        data[prop] = {
            error: {
                message: '',
                hasError: false,
                kind: 'normal'
            },
            validations,
            value
        }
    }
    return data;
}


export function useForm<T>(form: FormInitialState<T>) {
    const formData = useMemo(() => createState(form), [form]);

    const [formState, dispatch] = useReducer<React.Reducer<FormState<T>, FormAction<any>>>(
        formReducer,
        formData
    );

    const onChangeFactory = (field: keyof T) => {
        return (value: unknown) => {
            dispatch(new FormActionChange({
                value,
                field: field as string
            }));
        };
    };

    const setErrorFactory = (field: keyof T) => {
        return (value: unknown) => {        
            dispatch(new FormActionSetError({
                value,
                field: field as string
            }))
        }
    }

    const onSubmit = (submit: OnSubmit<T>) => {
        dispatch(new FormActionSubmit(submit));
    };

    const status = useMemo(() => { 
        return checkFormStatus(formState);
    }, [formState]);

    return {
        onChangeFactory,
        setErrorFactory,
        formState,
        onSubmit,
        status
    };
}

