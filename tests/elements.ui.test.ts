import { test, expect } from "@base/base.test";
import * as data from "@data/constants.data";
import * as tabsData from "@data/elements.ui.data";
import * as allure from "allure-js-commons";
import { Severity, step } from "allure-js-commons";

test.describe("Verify UI Elements on the Home Page.", async () => {
    test.beforeEach("Set up Playwright test environment.", async ({ forEachTest }) => {
        await allure.epic("UI: User Interface");
        await allure.story("UI-HOME: Validate Home Page UI Elements");
        await allure.tags("UI", "Home Page", "Elements");
    })

    test("@allure.id:UI-HOME-TC01 Verify that the header displays the App Name on the Home Page.",
        async ({ homePage }) => {
            await allure.description('Navigate to the Home Page and verify that the header displays the correct App Name.');
            await allure.severity(Severity.CRITICAL);

            await step('Verify that the H1 header is visible on the page.', async () => {
                await expect(homePage.header.h1).toBeVisible();
            });
            await step('Verify that the H1 header displays the correct App Name.', async () => {
                expect(await homePage.header.h1Text()).toStrictEqual(data.APP_NAME);
            });
        })

    test(`@allure.id:UI-HOME-TC02 Verify that the "Add" navigation tab loads correctly on Home Page.`,
        async ({ homePage }) => {
            await allure.description(`Verify that the "Add" tab is visible,enabled, and matches the expected class attribute.`);
            await allure.severity(Severity.NORMAL);

            await step('Verify "Add" tab element is attached to DOM.', async () => {
                await expect(homePage.tabs.addTab).toBeAttached();
            });

            await step('Verify there is 1 "Add" tab element on the Home Page.', async () => {
                await expect(homePage.tabs.addTab).toHaveCount(1);
            });

            await step('Verify "Add" tab is visible on the Home Page.', async () => {
                await expect(homePage.tabs.addTab).toBeVisible();
            });

            await step('Verify "Add" tab is enabled on the Home Page.', async () => {
                await expect(homePage.tabs.addTab).toBeEnabled();
            });

            await step('Verify "Add" tab is active on the Home Page.', async () => {
                expect(await homePage.tabs.addTabClassAttribute()).toStrictEqual(tabsData.ACTIVE);
            });
        })
})