import { measure } from "react-native-reanimated";
import { FormActionChange, FormActionSubmit, FormEntry, FormState, FormStatus } from "./types";

const applyAllValidations = (formEntry: FormEntry, formData: FormState) => {
    const errorData: {
        hasError: boolean,
        message: string;
    } = {
        hasError: false,
        message: ''
    }
    formEntry.validations.forEach((curr) => {
        if(errorData.hasError) return;
        const message = curr(formEntry.value, formData);
        errorData.hasError = Boolean(message);
        errorData.message = message ?? '';
    }); 
    formEntry.error = errorData;
    return formEntry;
}

export const submitAction = (action: FormActionSubmit, current: FormState) => {
    const newFormState = { ...current };
    let submitData: {
        [key: string]: unknown
    } = {};
    let hasError = false;
    for(let entryName in current) {
        const entry = current[entryName];
        applyAllValidations(entry, current);
        newFormState[entryName] = entry;
        if(!hasError) {
            hasError = entry.error.hasError;
        }
        submitData[entryName] = entry.value;
    }
    if(hasError) return newFormState;
    const { data } = action;
    data(submitData);
    return newFormState;
}

export const checkFormStatus = (current: FormState) => {
    let status: FormStatus = 'valid';
    for(let entryName in current) {
        const entry = current[entryName];
        applyAllValidations(entry, current);
        if(entry.error.hasError && status === 'valid') {
            status = 'error';
            break;
        }        
    }
    return status;
}

export const changeAction = (action: FormActionChange, current: FormState) => {
    const { data: { value, field } } = action;
    const newFormState = { ...current };
    const formEntry = {...newFormState[field]};
    if(!formEntry) throw new Error(`field [${field}] does not exists in form`);
    formEntry.value = value;
    applyAllValidations(formEntry, current)
    newFormState[field] = formEntry;
    return newFormState;
}