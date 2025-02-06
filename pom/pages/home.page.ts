import {Page, Locator} from "@playwright/test"
import { Header } from "@components/header";
import {Tab} from "@components/tab";

export class HomePage {

    private readonly page: Page;
    readonly header: Header;
    readonly tabs: Tab;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);
        this.tabs = new Tab(this.page);
    }
}