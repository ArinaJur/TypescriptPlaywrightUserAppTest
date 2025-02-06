import { test, expect, allureMeta } from "base/base.test";
import * as data from "@data/constants.data";
import * as tabsData from "@data/elements.ui.data";
import {description, epic, Severity, step, story, tags} from "allure-js-commons";

test.describe('Verify UI Elements on the Home Page.', async () => {
    test.beforeEach('', async () => {
        await allureMeta(
            epic('UI: User Interface'),
            story('UI-HOME: Validate Home Page UI Elements'),
            tags('UI', 'Home Page', 'Elements')
        );
    })

    test('@allure.id:UI-HOME-TC01 Verify that the header displays the App Name on the Home Page.',
        async ({ homePage }) => {
            await allureMeta(
                Severity.CRITICAL,
                description('Navigate to the Home Page and verify that the header displays the correct App Name.')
            );

            let actualAppName: string;
            const h1Header = homePage.header.h1;

            await step('Verify that the H1 header is visible on the page.', async () => {
                await expect(h1Header).toBeVisible();
            });
            await step('ACTUAL RESULT: Collect displayed App name.', async () => {
                actualAppName = await homePage.header.h1Text();
            });
            await step(`Verify that the H1 header displays the correct App Name "${data.APP_NAME}".`, async () => {
                expect(actualAppName).toStrictEqual(data.APP_NAME);
            });
        })

    test('@allure.id:UI-HOME-TC02 Verify that the "Add" navigation tab loads correctly on Home Page.',
        async ({ homePage }) => {
            await allureMeta(
                Severity.NORMAL,
                description('Verify that the "Add" tab is visible,enabled, and matches the expected class attribute.')
            );

            const addTab = homePage.tabs.addTab;
            const addTabClassAttribute = await homePage.tabs.addTabClassAttribute();

            await step('Verify "Add" tab element is attached to DOM.', async () => {
                await expect(addTab).toBeAttached();
            });
            await step(`Verify there is [${tabsData.TAB_COUNT}] "Add" tab element on the Home Page.`, async () => {
                await expect(addTab).toHaveCount(tabsData.TAB_COUNT);
            });
            await step('Verify "Add" tab is visible on the Home Page.', async () => {
                await expect(addTab).toBeVisible();
            });
            await step('Verify "Add" tab is enabled on the Home Page.', async () => {
                await expect(addTab).toBeEnabled();
            });
            await step('Verify "Add" tab is active on the Home Page.', async () => {
                expect(addTabClassAttribute).toStrictEqual(tabsData.ACTIVE);
            });
        })
})