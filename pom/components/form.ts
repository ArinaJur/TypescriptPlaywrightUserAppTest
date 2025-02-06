import {Page, Locator} from "@playwright/test";
import {step} from "allure-js-commons";

export class Form {

    private readonly page: Page;
    private readonly firstNamePlaceholder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNamePlaceholder = this.page.getByPlaceholder("Enter first name...");
    }

    async inputFirstName(firstName: string) {
        await this.firstNamePlaceholder.waitFor({state: "visible"});
        await this.firstNamePlaceholder.fill(firstName);
    }

}

