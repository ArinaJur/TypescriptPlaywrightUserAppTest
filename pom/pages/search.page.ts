import {Page, Locator, expect} from '@playwright/test'

export class SearchPage {
    private readonly page: Page;
    private readonly firstNamePlaceholder: Locator;
    readonly searchButton: Locator;
    private readonly tableRow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNamePlaceholder = page.getByPlaceholder("Enter first name...");
        this.searchButton = page.getByRole('button', { name: 'Search', exact: true })
        this.tableRow = page.locator("tbody>tr");
    }

    async inputFirstName(firstName: string) {
        await this.page.waitForLoadState("networkidle");
        await expect(this.tableRow.first()).toBeAttached();
        await expect(this.searchButton).not.toBeEnabled();
        await this.firstNamePlaceholder.fill(firstName);
    }

    async clickSearchButton() {
        // await Promise.all([
        //     this.page.waitForResponse("/api/users/"),
        //     expect(this.searchButton).toBeEnabled().then(r => console.log("1")),
        //     this.page.click("button").then(r => console.log("2"))
        // ]);

        await this.page.waitForLoadState("networkidle");
        await this.searchButton.click()


    }

    async getSingleResultInfo() {
        await this.tableRow.first().hover();
        await expect(this.tableRow.first()).toBeVisible();

        return await this.tableRow.first().innerText().then(text => text.split("\t"));
    }

}