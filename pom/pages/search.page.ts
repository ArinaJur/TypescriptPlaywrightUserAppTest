import {Page, Locator} from "@playwright/test";
import {Header} from "@components/header";
import {Tab} from "@components/tab";
import {Form} from "@components/form";
import {step} from "allure-js-commons";
import {Table} from "@components/table";

export class SearchPage {

    private readonly page: Page;
    readonly header: Header;
    readonly tabs: Tab;
    readonly searchForm: Form;
    readonly table: Table;
    private readonly _searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);
        this.tabs = new Tab(this.page);
        this.searchForm = new Form(this.page);
        this.table = new Table(this.page);

        this._searchButton = page.getByRole('button', { name: 'Search', exact: true })
    }

    get searchButton(): Locator {
        return this._searchButton;
    }

    async isLoad() {
        return await step('Wait for the Search Page to load and verify essential elements are visible.\n', async () => {
            return (await Promise.all([
                this.page.waitForLoadState("domcontentloaded"),
                this.table.firstRow.waitFor({state: "attached"}),
                this.table.firstRow.waitFor({state: "visible"}),
                this.searchButton.waitFor({state: "visible"})
            ])).every(result => result !== null);
        });
    }

    async clickSearchButton() {
        return await step('Click "Search" button.', async () => {
            await this._searchButton.click()
        });
    }



}