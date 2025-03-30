import { FormState } from "../types";

export const required = (field: string) => {
    return (value: unknown) => {
        if(!value) return `${field} is required`;
        return;
    }
}

export const equalsTo = (field: string, comparableField: string, comparableFieldLabel?: string) => {
    return (value: unknown, form: FormState): string | undefined => {
        const comparableEntry = form[comparableField];
        if(!comparableEntry) {
            console.error(`Field ${comparableField} does not exists`);
            return;
        }
        if(value !== comparableEntry.value) {
            return `Field ${field} must be equals to ${comparableFieldLabel ? comparableFieldLabel : comparableField}`;
        }
        return;
    }
}

export const minLen = (field: string, min: number) => {
    return (value: unknown) => {
        if(typeof value !== 'string') {
            console.error(`${value} is not a string. it won't be validated`);
            return;
        }
        if(value.length < min) {
            return `Field ${field} must have at least ${min} characters`;
        }
        return;
    }
}