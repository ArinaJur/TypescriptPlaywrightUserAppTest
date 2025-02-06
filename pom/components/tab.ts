import { Page, Locator } from "@playwright/test";
import {step} from "allure-js-commons";

export class Tab {

    private readonly page: Page;
    private readonly _addTab: Locator;
    private readonly _searchTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this._addTab = this.page.getByRole('link', {name: 'Add', exact: true});
        this._searchTab = this.page.getByRole('link', {name: 'Search', exact: true});
    }

    get addTab(): Locator {
        return this._addTab;
    }

    get searchTab(): Locator {
        return this._searchTab;
    }

    async addTabClassAttribute() {
        return step('Retrieve attribute "class" from "Add" tab element.', async () => {
            return await this.addTab.getAttribute('class');
        });
    }

    async searchTabClassAttribute() {
        return step('Retrieve attribute "class" from "Search" tab element.', async () => {
            return await this.addTab.getAttribute('class');
        });
    }

    async clickSearchTab() {
        return step('Ensure the "Search" tab is visible, hover over it, and click to open the Search Page.', async () => {
            await Promise.all([
                this.searchTab.waitFor({state: "visible"}),
                this.searchTab.hover(),
                this.searchTab.click()
            ])
        });
    }



}

