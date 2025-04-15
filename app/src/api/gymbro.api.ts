import { Axios, AxiosError, AxiosResponse } from "axios";
import { AuthApi } from "./services/auth.api";
import { BadRequest, BaseApiResponse, InternalServerError } from "./response/base-api-response";
import { FieldErrorApi, FieldErrorApiResponse } from "./response/field-error-api-response";

export class GymbroApi {
    constructor(
        private _client: Axios
    ) {}
    get client(): Axios {
        return this._client;
    }
    get auth(): AuthApi {
        return new AuthApi(this);
    }
    private handleCall(response: AxiosResponse<BaseApiResponse>) {
        if(response.status === 200 || response.status === 201) {
            return response.data;
        }
        if(response.status === 422) {
            throw new FieldErrorApi(response.data as FieldErrorApiResponse);
        }
        if(response.status >= 400 && response.status < 500) {
            throw new BadRequest(response.data);
        }
        throw new InternalServerError(response.data);
    }
    async post<T>(url: string, data: T): Promise<BaseApiResponse> {
        let response: AxiosResponse<BaseApiResponse>
        try {
            response = await this.client.post(url, data);
        } catch(error: unknown) {
            if(error instanceof AxiosError && error.response) {
                response = error.response;
            }
        } finally {
            if(response!) return this.handleCall(response);
            throw new Error('Unknown error occurred!');
        }
    }
}