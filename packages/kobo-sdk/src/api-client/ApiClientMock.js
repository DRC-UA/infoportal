"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClientMock = void 0;
const ApiClient_1 = require("./ApiClient");
class ApiClientMock {
    baseUrl = 'mockApi';
    requests = [];
    mocks = [];
    fetch;
    constructor({ baseUrl, headers, requestInterceptor, mapData, mapError }) {
        this.fetch = async (method, url, options) => {
            // @ts-ignore bypass private method
            const builtOptions = await ApiClient_1.ApiClient.buildOptions(options, headers, requestInterceptor);
            const returnValue = this.mocks.find(_ => _.urlPattern.test(url))?.returnValue;
            this.requests.push({
                method,
                url,
                options: builtOptions,
                qs: builtOptions.qs,
            });
            return Promise.resolve(returnValue);
        };
    }
    mock = (urlPattern, returnValue) => {
        this.mocks.push({ urlPattern, returnValue });
    };
    get = (uri, options) => {
        return this.fetch('GET', uri, options);
    };
    getPdf = (uri, options) => {
        return this.fetch('GET', uri, options);
    };
    postGetPdf = (uri, options) => {
        return this.fetch('POST', uri, options);
    };
    post = (uri, options) => {
        return this.fetch('POST', uri, options);
    };
    delete = (uri, options) => {
        return this.fetch('DELETE', uri, options);
    };
    put = (uri, options) => {
        return this.fetch('PUT', uri, options);
    };
    patch = (uri, options) => {
        return this.fetch('PATCH', uri, options);
    };
}
exports.ApiClientMock = ApiClientMock;
