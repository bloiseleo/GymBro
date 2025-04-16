import { FormValues } from "./actions";

export type FormInitialEntry = {
    value: unknown,
    validations: ValidationFunction[],
}
export type FormInitialState<T> = {
    [K in keyof T]: FormInitialEntry
}

export type ValidationFunction = <T>(value: unknown, formData: FormState<T>) => string | undefined;

export type FormEntry = {
    value: unknown,
    validations: ValidationFunction[],
    error: FormEntryError,
    touched?: boolean;
}

export type FormEntryError = {
    message?: string;
    hasError: boolean;
    kind: "server" | "normal";
}

export type FormStatus = 'valid' | 'error';

export type FormState<T> = {
    [K in keyof T]: FormEntry;
}

export enum FormActions {
    CHANGE
};

export class FormAction<T> {
    constructor(public data: T) {}
}

export type OnSubmit<T> = (value: FormValues<T>) => void;

export class FormActionSubmit<T> extends FormAction<OnSubmit<T>> { 
    constructor(data: OnSubmit<T>) {
        super(data);
    }
}

export class FormActionSetError extends FormAction<{
    value: unknown,
    field: string
}> {
    constructor(data: {
        value: unknown,
        field: string
    }) {
        super(data);
    }
}

export class FormActionChange extends FormAction<{
    value: unknown,
    field: string
}> {
    constructor(data: {
        value: unknown,
        field: string
    }) {
        super(data);
    }
}