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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const os = __importStar(require("node:os"));
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
// @ts-ignore
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '.env') });
exports.default = (0, test_1.defineConfig)({
    testDir: './tests',
    testIgnore: 'template*',
    outputDir: './reports/test-results',
    timeout: 15 * 1000,
    expect: {
        timeout: 5 * 1000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['json', { outputFile: 'reports/json-report/report.json' }],
        ['html', { outputFolder: 'reports/html-report/', open: 'never' }],
        ['junit', { outputFile: 'reports/junit-report/report.xml' }],
        ['@estruyf/github-actions-reporter'],
        ['monocart-reporter', { name: "Monocart Report", outputFile: 'reports/monocart-report/index.html' }],
        ['allure-playwright',
            {
                resultsDir: 'reports/allure-report',
                detail: true,
                suiteTitle: true,
                categories: [
                    {
                        name: "Reports",
                        messageRegex: "bar",
                        traceRegex: "baz",
                    },
                ],
                environmentInfo: {
                    os_platform: os.platform(),
                    os_release: os.release(),
                    os_version: os.version(),
                    node_version: process.version,
                    process_platform: process.platform,
                },
                storeTrends: true,
            },
        ],
    ],
    use: {
        baseURL: process.env.URL,
        headless: true,
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: 'SetUp',
            testMatch: /.*\.setup\.ts/,
            timeout: 100 * 1000,
        },
        {
            name: 'Chromium',
            testMatch: /.*\.test\.ts/,
            use: Object.assign(Object.assign({}, test_1.devices['Desktop Chrome']), { headless: !!process.env.CI }),
            dependencies: ['SetUp'],
        },
        {
            name: 'FireFox',
            testMatch: /.*\.test\.ts/,
            use: Object.assign(Object.assign({}, test_1.devices['Desktop Firefox']), { headless: !!process.env.CI }),
            dependencies: ['SetUp'],
        },
    ],
});
