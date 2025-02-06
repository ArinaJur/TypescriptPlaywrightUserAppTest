import {test, expect, allureMeta} from "base/base.test";
import * as usersData from "@data/users.data";
import {description, epic, Severity, step, story, tags} from "allure-js-commons";

test.describe('Verify Search User Functionality.', async () => {
    test.beforeEach('', async () => {
        await allureMeta(
            epic('FUN: Search user.'),
            story('FUN-SEARCH: Search for a User/users using one or multiple criteria.'),
            tags('FUN', 'SEARCH')
        )
    })

    test('@allure.id:FUN-SEARCH-TC01 Search for a User by Unique First Name.',
        async ({createDB, homePage, searchPage}) => {
            await allureMeta(
                Severity.NORMAL,
                description('This test verifies that the "Search" tab is accessible, allows user input, ' +
                    'enables the search button upon valid input, and correctly displays the searched user’s details ' +
                    'in the results table.')
            )

            let actualUserInfo: string[];
            const expectedFirstName = usersData.uniqueFirstNameUser.firstName;
            const expectedLastName = usersData.uniqueFirstNameUser.lastName;
            const expectedAge = usersData.uniqueFirstNameUser.age.toString();

            {
                await step('1. Click "Search" tab on the Home page.', async () => {
                    await homePage.tabs.clickSearchTab();
                });
                await step('2. Verify that the Search Page loads correctly.', async () => {
                    const isLoadResult = await searchPage.isLoad();
                    expect(isLoadResult).toBeTruthy();
                })
                await step(`3. Input "${expectedFirstName}" into the "First Name" field.`, async () => {
                    await searchPage.searchForm.inputFirstName(expectedFirstName);
                });
                await step('4. Click "Search" button when enabled.', async () => {
                    await expect(searchPage.searchButton).toBeEnabled();
                    await searchPage.clickSearchButton();
                });
            }

            await step(`Verify "Search" button became disabled after clicking.`, async () => {
                await expect(searchPage.searchButton).not.toBeEnabled();
            });
            await step(`Verify the number of users displayed in search results is 1.`, async () => {
                await expect(searchPage.table.row).toHaveCount(1);
            });
            await step('ACTUAL RESULT: Collect User info from the single search result.', async () => {
                actualUserInfo = await searchPage.table.getSingleResultInfo(searchPage.table.firstRow);
            });
            await step(`Verify the first name in the search results matches the expected value "${expectedFirstName}".`,
                async () => { expect(actualUserInfo[1]).toStrictEqual(expectedFirstName);
            });
            await step(`Verify the last name in the search results matches the expected value "${expectedLastName}".`,
                async () => { expect(actualUserInfo[2]).toStrictEqual(expectedLastName);
            });
            await step(`Verify the age in the search results matches the expected value "${expectedAge}".`,
                async () => { expect(actualUserInfo[3]).toStrictEqual(expectedAge);
            });
        })


    test('Search User With Unique First Name', async ({page, forEachTest, createDB}) => {
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

        await firstNamePlaceholder.fill(usersData.uniqueFirstNameUser.firstName);

        await expect(searchButton).toBeEnabled();
        await searchButton.click();

        await expect(tableRow).toHaveCount(1);
        await tableRow.hover();
        await expect(tableRow).toBeVisible();

        const actualUserInfo = await tableRow.innerText().then(text => text.split("\t"));

        expect(actualUserInfo[1]).toStrictEqual(usersData.uniqueFirstNameUser.firstName);
        expect(actualUserInfo[2]).toStrictEqual(usersData.uniqueFirstNameUser.lastName);
        expect(actualUserInfo[3]).toStrictEqual(usersData.uniqueFirstNameUser.age.toString());
    })
})