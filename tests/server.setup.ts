import {test, expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'
import {step, Severity} from "allure-js-commons";
import * as allure from "allure-js-commons";

test.beforeAll("Wait for the server to be responsive.", async () => {
    await allure.epic("SRV-1: Server Availability and Homepage Load.");
    await allure.story("SRV-1-01: Verify API responds successfully upon navigation.");

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    await step("Launch Chromium browser.", async () => {
        browser = await chromium.launch();
    })
    await step("Create a new browser context.", async () => {
        context = await browser.newContext();
    });

    await step("Create a new page.", async () => {
        page = await context.newPage();
    });

    await step("Navigate to '/api/' and wait for a successful response.", async () => {
        await Promise.all([
            page.waitForResponse(response =>
                response.url().endsWith('/api/')
                && response.status() === 200
            ),
            await page.goto('/api/'),
        ]);
    })
});

test("@allure.id:SRV-1-01-TC01 Ensure the homepage loads correctly.", async ({ page }) => {
    await allure.description("Ensure that the homepage loads correctly by verifying URL and '/api/users/' response.");
    await allure.tags("SRV", "/api/", "/api/users/");
    await allure.severity(Severity.BLOCKER);

    await step("Navigate to the homepage and wait for a successful '/api/users/' response.", async () => {
        await Promise.all([
            page.waitForResponse(response =>
                response.url().endsWith('/api/users/') && response.status() === 200
            ),
            page.goto('/'),
        ]);
    });

    await step(`Verify that the homepage URL matches '${process.env.URL}'.`, async () => {
        expect(page.url()).toEqual(`${process.env.URL}/`);
    });
});


