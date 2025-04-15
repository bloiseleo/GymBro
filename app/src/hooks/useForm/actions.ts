import { FormActionChange, FormActionSetError, FormActionSubmit, FormEntry, FormEntryError, FormState, FormStatus } from "./types";

const applyAllValidations = <T>(formEntry: FormEntry, formData: FormState<T>) => {
    const errorData: FormEntryError = {
        hasError: false,
        message: '',
        kind: 'normal'
    }
    const newFormEntry = { ...formEntry };
    newFormEntry.validations.forEach((curr) => {
        if(errorData.hasError) return;
        const message = curr(newFormEntry.value, formData);
        errorData.hasError = Boolean(message);
        errorData.message = message ?? '';
    }); 
    newFormEntry.error = errorData;
    return newFormEntry;
}

export type FormValues<T> = {
    [K in keyof T]: unknown
}

export const submitAction = <T>(action: FormActionSubmit<T>, current: FormState<T>) => {
    const newFormState = { ...current };
    let submitData: FormValues<T> = {} as FormValues<T>;
    let hasError = false;
    for(let entryName in current) {
        const entry = current[entryName];
        const newEntry = applyAllValidations(entry, current);
        newFormState[entryName] = newEntry;
        if(!hasError) {
            hasError = newEntry.error.hasError;
        }
        submitData[entryName] = newEntry.value;
    }
    if(hasError) return newFormState;
    const { data } = action;
    data(submitData);
    return newFormState;
}

export const checkFormStatus = <T>(current: FormState<T>) => {
    let status: FormStatus = 'valid';
    for(let entryName in current) {
        const entry = current[entryName];
        if((entry.error.hasError && entry.error.kind === 'server'))  {
            status = 'error';
            break;
        }
        if(!entry.touched) continue;
        const newEntry = applyAllValidations(entry, current);
        current[entryName] = newEntry
        const { error: { hasError } } = newEntry;
        if(hasError && status === 'valid') {
            status = 'error';
            break;
        }        
    }
    return status;
}

export const changeAction = <T>(action: FormActionChange, current: FormState<T>) => {
    const { data: { value, field } } = action;
    const newFormState = { ...current };
    const formEntry = {...newFormState[field as keyof T]};
    if(!formEntry) throw new Error(`field [${field}] does not exists in form`);
    formEntry.value = value;
    formEntry.touched = true;
    const newEntry = applyAllValidations(formEntry, current)
    newFormState[field as keyof T] = newEntry;
    return newFormState;
}

export const setErrorAction = <T>(action: FormActionSetError, current: FormState<T>) => {
    const { data: { value, field } } = action;
    const newFormState = { ...current };
    const formEntry = {...newFormState[field as keyof T]};
    if(!formEntry) throw new Error(`field [${field}] does not exists in form`);
    formEntry.touched = true;
    formEntry.error.hasError = true;
    formEntry.error.message = value as string;
    formEntry.error.kind = 'server';
    newFormState[field as keyof T] = formEntry;
    return newFormState;
}