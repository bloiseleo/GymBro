export type BaseApiResponse = {
    time: string;
    status: number;
    message: string;
}

export class BadRequest extends Error {
    constructor(public data: BaseApiResponse) {
        super();
    }
}

export class InternalServerError extends Error {
    constructor(public data: BaseApiResponse) {
        super();
    }
}