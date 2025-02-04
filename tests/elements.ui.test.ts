import { test, expect } from "@base/base.test";
import * as data from "@data/constants.data";
import { UI_TABS } from "@data/elements.ui.data";
import * as allure from "allure-js-commons";
import { Severity, step } from "allure-js-commons";


test.describe("Verify UI elements on the HomePage.", async() => {
    test.beforeEach("Set up Playwright test environment.", async() => {
        await allure.epic("UI-2: User Interface");
        await allure.story("UI-2-01: Validate Home Page UI Elements")
    })

    test("@allure.id:2-01-01 Verify that the  header displays the App Name on the Home Page.", async({ forEachTest, homePage }) => {
        await allure.description('Opens the website and verifies that the App Name appears in the header.');
        await allure.tags("UI","Home Page", "Elements");
        await allure.severity(Severity.CRITICAL);

        await step('Verify that the H1 header is visible on the page.', async () => {
            await expect(homePage.pageHeader.h1).toBeVisible();
        });

        const h1Text = await homePage.pageHeader.getH1Text();

        await step('Verify that the H1 header displays the correct App Name.', async () => {
            expect(h1Text).toStrictEqual(data.APP_NAME);
        });
    })

    UI_TABS.forEach(( { tabName, expected } ) => {
        test(`Verify ${tabName} Tab Load Correctly And Available `, async({ page, forEachTest }) => {
            const tab = page.getByRole('link', {name: `${tabName}`, exact: true});
            const tabClassAttribute = await tab.getAttribute('class');

            await expect(tab).toBeAttached();
            await expect(tab).toHaveCount(1);
            await expect(tab).toBeVisible();
            await expect(tab).toBeEnabled();
            expect(tabClassAttribute).toStrictEqual(`${expected}`);
        })
    })
})