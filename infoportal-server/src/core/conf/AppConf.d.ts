export declare const appConf: {
    baseUrl: string;
    logLevel: string | undefined;
    rootProjectDir: string;
    disableScheduledTask: boolean;
    production: boolean;
    port: number;
    ownerEmail: string;
    cors: {
        allowOrigin: string;
    };
    sentry: {
        dns: string | undefined;
    };
    buildingBlockWfp: {
        otpURL: string;
        login: string;
        password: string;
    };
    dbAzureHdp: {
        host: string;
        user: string;
        password: string;
        port: number | undefined;
        schema: string;
    };
    db: {
        maxConcurrency: number;
        url: string;
    };
    kobo: {
        dbDefaultServerId: string;
        url: string;
        token: string;
    };
    ecrecApp: {
        login: string;
        password: string;
    };
    legalAid: {
        apiToken: string;
    };
    activityInfo: {
        apiToken: string;
    };
    params: {
        assistanceAmountUAH: (d: Date) => 3600 | 2220;
    };
};
export type AppConf = typeof appConf;
//# sourceMappingURL=AppConf.d.ts.map