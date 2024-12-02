import { ApiClientApi, ApiClientParams, Method, RequestOption } from './ApiClient';
export interface TestRequest {
    method: Method;
    url: string;
    options?: RequestOption;
    qs?: any;
}
export declare class ApiClientMock implements ApiClientApi {
    readonly baseUrl = "mockApi";
    readonly requests: TestRequest[];
    private readonly mocks;
    private readonly fetch;
    constructor({ baseUrl, headers, requestInterceptor, mapData, mapError }: ApiClientParams);
    readonly mock: (urlPattern: RegExp, returnValue: any) => void;
    readonly get: <T = any>(uri: string, options?: RequestOption) => Promise<T>;
    readonly getPdf: (uri: string, options?: RequestOption) => Promise<Blob>;
    readonly postGetPdf: (uri: string, options?: RequestOption) => Promise<Blob>;
    readonly post: <T = any>(uri: string, options?: RequestOption) => Promise<T>;
    readonly delete: <T = any>(uri: string, options?: RequestOption) => Promise<T>;
    readonly put: <T = any>(uri: string, options?: RequestOption) => Promise<T>;
    readonly patch: <T = any>(uri: string, options?: RequestOption) => Promise<T>;
}
//# sourceMappingURL=ApiClientMock.d.ts.map