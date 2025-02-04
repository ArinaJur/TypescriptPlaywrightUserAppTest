import {Page, Locator, expect} from '@playwright/test'
import { PageHeader } from "@components/pageHeader";

export class HomePage {
    private readonly page: Page;
    private readonly searchTab: Locator;
    readonly pageHeader: PageHeader;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = new PageHeader(this.page);
        this.searchTab = this.page.getByRole('link', {name: 'Search', exact: true});
    }

    async clickSearchTab() {
        await expect(this.searchTab).toBeEnabled();
        await this.searchTab.hover();
        await this.searchTab.click();
    }
}