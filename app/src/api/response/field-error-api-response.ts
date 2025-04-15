import { BaseApiResponse } from "./base-api-response";

export type FieldErrorApiResponse = BaseApiResponse & {
    fieldErrors: Map<string, string>;
}

export class FieldErrorApi extends Error {
    constructor(public data: FieldErrorApiResponse) {
        super();
    }
}