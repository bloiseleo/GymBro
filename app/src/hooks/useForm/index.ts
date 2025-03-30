import { useReducer, useState } from "react"
import { FormAction, FormActionChange, FormActions, FormInitialState, FormState, FormActionSubmit, OnSubmit } from "./types";
import { changeAction, checkFormStatus, submitAction } from "./actions";

const formReducer = (current: FormState, action: FormAction<any>) => {
    switch(action.constructor) {
        case FormActionChange:
            return changeAction(action, current);
        case FormActionSubmit:
            return submitAction(action, current);
        default:
            throw new Error(`action of type [${action.constructor.name}] was not recognized`)
    }
}

const createState = (initial: FormInitialState): FormState => {
    const data: FormState = {}
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

export function useForm(form: FormInitialState) {
    const [formState, dispatch] = useReducer(formReducer, createState(form));
    const onChangeFactory = (field: string) => {
        return (value: unknown) => {
            dispatch(new FormActionChange({
                value,
                field
            }))
        }
    }
    const onSubmit = (submit: OnSubmit) => {
        dispatch(new FormActionSubmit(submit))
    }
    const getFormStatus = () => {
        return checkFormStatus(formState);
    }
    return {
        onChangeFactory,
        formState,
        onSubmit,
        getFormStatus
    }
}
