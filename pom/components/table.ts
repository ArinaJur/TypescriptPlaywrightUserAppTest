import { Page, Locator } from "@playwright/test";
import {step} from "allure-js-commons";

export class Table {

    private readonly page: Page;
    private readonly table: Locator;
    private readonly _row: Locator;
    private readonly _firstRow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = this.page.locator('table');
        this._row = this.table.locator('tbody>tr');
        this._firstRow = this._row.first();
    }

    get firstRow(): Locator {
        return this._firstRow;
    }

    get row(): Locator {
        return this._row;
    }

    async getSingleResultInfo(row: Locator) {
        return await step(`Retrieve user information from ${row}.`, async () => {
            await row.hover();
            await row.waitFor({state: "visible"});

            return await row.innerText().then(text => text.split("\t"));
        })
    }



}

