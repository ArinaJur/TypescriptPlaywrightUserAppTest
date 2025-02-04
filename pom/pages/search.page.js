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
exports.SearchPage = void 0;
const test_1 = require("@playwright/test");
class SearchPage {
    constructor(page) {
        this.page = page;
        this.firstNamePlaceholder = page.getByPlaceholder("Enter first name...");
        this.searchButton = page.getByRole("button", { name: "Search", exact: true });
        this.tableRow = page.locator('table > tbody > tr');
    }
    inputFirstName(firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.firstNamePlaceholder.fill(firstName);
        });
    }
    clickSearchButton() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.page.waitForResponse(response => response.url().includes('/api/users'));
            yield this.searchButton.click();
            (0, test_1.expect)(response.status()).toBe(200);
        });
    }
    getTbodyRowCounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tableRow.count();
        });
    }
}
exports.SearchPage = SearchPage;
