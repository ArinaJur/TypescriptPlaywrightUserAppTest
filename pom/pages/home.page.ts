import {Page, Locator, expect} from '@playwright/test'
import { Header } from "@components/header";
import {Tabs} from "@components/tabs";

export class HomePage {
    private readonly page: Page;
    // private readonly searchTab: Locator;
    readonly header: Header;
    readonly tabs: Tabs;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);
        this.tabs = new Tabs(this.page);


    }


    // async clickSearchTab() {
    //     await expect(this.searchTab).toBeEnabled();
    //     await this.searchTab.hover();
    //     await this.searchTab.click();
    // }
}