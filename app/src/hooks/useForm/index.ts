import { useMemo, useReducer, useState } from "react"
import { FormAction, FormActionChange, FormActions, FormInitialState, FormState, FormActionSubmit, OnSubmit, FormInitialEntry } from "./types";
import { changeAction, checkFormStatus, submitAction } from "./actions";

const formReducer = <T>(current: FormState<T>, action: FormAction<any>) => {
    switch(action.constructor) {
        case FormActionChange:
            return changeAction(action, current);
        case FormActionSubmit:
            return submitAction(action, current);
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
                hasError: false
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

    const onSubmit = (submit: OnSubmit) => {
        dispatch(new FormActionSubmit(submit));
    };

    const getFormStatus = () => {
        return checkFormStatus(formState);
    };

    return {
        onChangeFactory,
        formState,
        onSubmit,
        getFormStatus
    };
}

