import { Page, Locator } from "@playwright/test";
import { step } from "allure-js-commons";

export class Header {

    private readonly page: Page;
    private readonly _h1: Locator;

    constructor(page: Page) {
        this.page = page;
        this._h1 = this.page.getByTestId('appName');
    }

    get h1(): Locator {
        return this._h1;
    }

    async h1Text() {
        return await step('Retrieve H1 header text.', async () => {
            return await this.h1.innerText();
        });
    }



}

