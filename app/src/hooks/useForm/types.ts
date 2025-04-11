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
    error: {
        message?: string;
        hasError: boolean;
    }
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

export type OnSubmit = (value: unknown) => void;

export class FormActionSubmit extends FormAction<OnSubmit> { 
    constructor(data: OnSubmit) {
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