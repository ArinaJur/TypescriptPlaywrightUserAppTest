"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.beforeAll("SetUp", () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield test_1.chromium.launch();
    const context = yield browser.newContext();
    const page = yield context.newPage();
    yield Promise.all([
        page.waitForResponse(response => response.url().endsWith('/api/')
            && response.status() === 200),
        yield page.goto('/api/'),
    ]);
}));
(0, test_1.test)('Check if server is alive', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield Promise.all([
        page.waitForResponse(response => response.url().endsWith('/api/users/')
            && response.status() === 200),
        yield page.goto('/'),
    ]);
    (0, test_1.expect)(page.url()).toEqual(`${process.env.URL}/`);
}));
// test('Create Directories', async() => {
//     const testData = "./@testData/";
//
//     // Check if the directory exists
//     if (!fs.existsSync(testData)) {
//         // Create the directory
//         fs.mkdirSync(testData, { recursive: true });
//     }
//
//     const pages = "./@pages/";
//
//     // Check if the directory exists
//     if (!fs.existsSync(pages)) {
//         // Create the directory
//         fs.mkdirSync(pages, { recursive: true });
//     }
// })
