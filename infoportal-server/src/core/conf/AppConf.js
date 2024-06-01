"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConf = void 0;
const ts_utils_1 = require("@alexandreannic/ts-utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const e = (0, ts_utils_1.env)(process.env);
exports.appConf = {
    baseUrl: e((0, ts_utils_1.defaultValue)('https://infoportal-ua-api.drc.ngo'))('BASE_URL'),
    logLevel: e()('LOG_LEVEL'),
    rootProjectDir: e((0, ts_utils_1.defaultValue)(__dirname))('ROOT_PROJECT_DIR'),
    disableScheduledTask: e(ts_utils_1.bool, (0, ts_utils_1.defaultValue)(false))('DISABLED_SCHEDULED_TASK'),
    production: e(_ => _?.toLowerCase() === 'production', (0, ts_utils_1.defaultValue)(true))('NODE_ENV'),
    port: e(ts_utils_1.int, (0, ts_utils_1.defaultValue)(80))('PORT'),
    ownerEmail: e((0, ts_utils_1.defaultValue)('alexandre.annic@drc.ngo'))('OWNER_EMAIL'),
    cors: {
        allowOrigin: e((0, ts_utils_1.defaultValue)(`http://localhost:3000`))('CORS_ALLOW_ORIGIN'),
    },
    sentry: {
        dns: e()('SENTRY_DNS')
    },
    buildingBlockWfp: {
        otpURL: e(ts_utils_1.required)('BUILDINGBLOCK_WFP_OTP_URL'),
        login: e(ts_utils_1.required)('BUILDINGBLOCK_WFP_LOGIN'),
        password: e(ts_utils_1.required)('BUILDINGBLOCK_WFP_PASSWORD'),
    },
    dbAzureHdp: {
        host: e((0, ts_utils_1.defaultValue)('hdp-ukr.database.windows.net'))('DBAZUREHDP_HOST'),
        user: e((0, ts_utils_1.defaultValue)('alexandreannic'))('DBAZUREHDP_USER'),
        password: e(ts_utils_1.required)('DBAZUREHDP_PWD'),
        port: e(ts_utils_1.required, ts_utils_1.int)('DBAZUREHDP_PORT'),
        schema: 'hdp',
    },
    db: {
        maxConcurrency: e(ts_utils_1.int, (0, ts_utils_1.defaultValue)(50))('DATABASE_MAX_CONCURRENCY'),
        url: e(ts_utils_1.required)('DATABASE_URL')
    },
    //   host: e(required)('DB_HOST'),
    //   user: e(required)('DB_USER'),
    //   database: e(required)('DB_NAME'),
    //   password: e(required)('DB_PASSWORD'),
    //   port: e(int, defaultValue(5432))('DB_PORT')
    // },
    kobo: {
        dbDefaultServerId: e((0, ts_utils_1.defaultValue)('4820279f-6c3d-47ba-8afe-47f86b16ab5d'))('KOBO_DB_DEFAULT_SERVERID'),
        url: e((0, ts_utils_1.defaultValue)('https://kobo.humanitarianresponse.info'))('KOBO_URL'),
        token: e(ts_utils_1.required)('KOBO_TOKEN'),
    },
    ecrecApp: {
        login: e(ts_utils_1.required)('ECRECAPP_LOGIN'),
        password: e(ts_utils_1.required)('ECRECAPP_PASSWORD'),
    },
    legalAid: {
        apiToken: e(ts_utils_1.required)('LEGALAID_API_TOKEN')
    },
    activityInfo: {
        apiToken: e(ts_utils_1.required)('ACTIVITY_INFO_API_TOKEN')
    },
    params: {
        assistanceAmountUAH: (d) => d.getTime() > new Date(2023, 9, 1).getTime() ? 3600 : 2220
    }
};
