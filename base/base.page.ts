import { test as base, expect } from "@playwright/test";
import { HomePage } from "@pages/home.page";
import { SearchPage } from "@pages/search.page";
import {step} from "allure-js-commons";

export type MyPages = {
    homePage: HomePage;
    searchPage: SearchPage;
};

export const test = base.extend<MyPages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },
});

export { expect } from '@playwright/test';
