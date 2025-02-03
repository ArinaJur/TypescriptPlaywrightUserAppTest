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
[
    { tabName: 'Add', expected: 'nav-link active' },
    { tabName: 'Search', expected: 'nav-link' },
].forEach(({ tabName, expected }) => {
    test_1.test.describe('Navigation tabs are available', () => __awaiter(void 0, void 0, void 0, function* () {
        test_1.test.beforeEach('Navigate to home page url', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
            yield page.goto('/');
        }));
        (0, test_1.test)(`TC-NavBar-1: Verify ${tabName} Tab Load Correctly And Available`, (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
            const tab = page.getByRole('link', { name: `${tabName}`, exact: true });
            const tabClassAttribute = yield tab.getAttribute('class');
            yield (0, test_1.expect)(tab).toBeAttached();
            yield (0, test_1.expect)(tab).toHaveCount(1);
            yield (0, test_1.expect)(tab).toBeVisible();
            yield (0, test_1.expect)(tab).toBeEnabled();
            (0, test_1.expect)(tabClassAttribute).toStrictEqual(`${expected}`);
        }));
    }));
});
