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
const preconditions = __importStar(require("../utils/preconditions/preconditions"));
const home_page_1 = require("../@pages/home.page");
const search_page_1 = require("../@pages/search.page");
test_1.test.describe('Should Search Users By Search Criteria', () => __awaiter(void 0, void 0, void 0, function* () {
    let apiRequest;
    test_1.test.beforeEach('Create API Request Context, Create Preconditions', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        apiRequest = yield test_1.request.newContext();
        yield preconditions.deleteUsers(apiRequest);
        yield preconditions.createUsers(apiRequest);
        yield page.goto('/');
    }));
    (0, test_1.test)('Search User With Unique First Name', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield new home_page_1.HomePage(page).clickSearchTab();
        const searchPage = new search_page_1.SearchPage(page);
        yield searchPage.inputFirstName(userJohn.firstName);
        yield searchPage.clickSearchButton();
        (0, test_1.expect)(yield searchPage.getTbodyRowCounts()).toBe(1);
    }));
    test_1.test.afterEach('Close API request context', () => __awaiter(void 0, void 0, void 0, function* () {
        yield apiRequest.dispose();
    }));
}));
