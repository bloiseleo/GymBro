import { GymbroApi } from "../gymbro.api";
import { SingInRequest } from "../request/sign-in-request";
import { SignUpRequest } from "../request/sign-up-request";
import { BadRequest, BaseApiResponse } from "../response/base-api-response";

export class AuthApi {
    constructor(
        private readonly gymbro: GymbroApi
    ) {}
    async signIn(payload: SingInRequest): Promise<BaseApiResponse> {
        const response = await this.gymbro.post<SingInRequest>('/auth/sign-in', payload);
        return response;
    }
    async signUp(payload: SignUpRequest): Promise<BaseApiResponse> {
        const response = await this.gymbro.post<SignUpRequest>('/auth/sign-up', payload);
        return response;
    }
}