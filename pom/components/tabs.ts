import { Page, Locator } from "@playwright/test";
import { step } from 'allure-js-commons';

export class Tabs {
    private readonly page: Page;
    private readonly _addTab: Locator;
    private readonly _searchTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this._addTab = page.getByRole('link', {name: "Add", exact: true});
        this._searchTab = page.getByRole('link', {name: "Search", exact: true});
    }

    get addTab(): Locator {
        return this._addTab;
    }

    get searchTab(): Locator {
        return this._searchTab;
    }

    async addTabClassAttribute() {
        return await this.addTab.getAttribute('class');
    }

    async searchTabClassAttribute() {
        return await this.addTab.getAttribute('class');
    }




}

