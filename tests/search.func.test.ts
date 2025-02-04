import { test, expect} from "@base/base.page";
import * as preconditions from "@preconditions/preconditions"
import * as data from "@data/users.data"
import {HomePage} from "@pages/home.page";
import {SearchPage} from "@pages/search.page";

test.describe('Should Search Users By Search Criteria', async () => {

    test('Search User With Unique First Name', async({ page, forEachTest, createDB }) => {
        const searchTab = page.getByRole('link', {name: 'Search', exact: true});
        const tableRow = page.locator("tbody>tr");
        const firstNamePlaceholder = page.getByPlaceholder("Enter first name...");
        const searchButton = page.getByRole("button", {name: "Search", exact: true});

        await expect(searchTab).toBeEnabled();
        await searchTab.hover();

        await searchTab.click();

        await expect(tableRow.first()).toBeAttached();
        await expect(searchButton).not.toBeEnabled();
        await expect(firstNamePlaceholder).toBeVisible();

        await firstNamePlaceholder.fill(data.uniqueFirstNameUser.firstName);

        await expect(searchButton).toBeEnabled();
        await searchButton.click();

        await expect(tableRow).toHaveCount(1);
        await tableRow.hover();
        await expect(tableRow).toBeVisible();

        const actualUserInfo = await tableRow.innerText().then(text => text.split("\t"));

        expect(actualUserInfo[1]).toStrictEqual(data.uniqueFirstNameUser.firstName);
        expect(actualUserInfo[2]).toStrictEqual(data.uniqueFirstNameUser.lastName);
        expect(actualUserInfo[3]).toStrictEqual(data.uniqueFirstNameUser.age.toString());
    })

    test('Search User With Unique First Name - POM', async({ page, forEachTest, createDB }) => {
        const searchTab = page.getByRole('link', {name: 'Search', exact: true});
        const tableRow = page.locator("tbody>tr");
        const firstNamePlaceholder = page.getByPlaceholder("Enter first name...");
        const searchButton = page.getByRole("button", {name: "Search", exact: true});

        await expect(searchTab).toBeEnabled();
        await searchTab.hover();

        await searchTab.click();

        await expect(tableRow.first()).toBeAttached();
        await expect(searchButton).not.toBeEnabled();
        await expect(firstNamePlaceholder).toBeVisible();

        await firstNamePlaceholder.fill(data.uniqueFirstNameUser.firstName);

        await expect(searchButton).toBeEnabled();
        await searchButton.click();

        await expect(tableRow).toHaveCount(1);
        await tableRow.hover();
        await expect(tableRow).toBeVisible();

        const actualUserInfo = await tableRow.innerText().then(text => text.split("\t"));

        expect(actualUserInfo[1]).toStrictEqual(data.uniqueFirstNameUser.firstName);
        expect(actualUserInfo[2]).toStrictEqual(data.uniqueFirstNameUser.lastName);
        expect(actualUserInfo[3]).toStrictEqual(data.uniqueFirstNameUser.age.toString());
    })
})