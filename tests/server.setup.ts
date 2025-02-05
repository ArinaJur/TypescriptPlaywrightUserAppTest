import {test, expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'
import {step, Severity} from "allure-js-commons";
import * as allure from "allure-js-commons";
import * as data from 'data/constants.data';

test.describe('Verify the server is responsive.', async () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeEach('Setup Playwright environment.', async () => {
        {
            await allure.epic('SRV: Server Availability and Homepage Load.');
            await allure.story('SRV-LOAD: Verify API responds successfully upon navigation.');
            await allure.tags('SRV', '/api/', '/api/users/');
            await allure.severity(Severity.BLOCKER);
        }

        await step('Launch Chromium browser.', async () => {
            browser = await chromium.launch();
        })
        await step('Create a new browser context.', async () => {
            context = await browser.newContext();
        });

        await step('Create a new page.', async () => {
            page = await context.newPage();
        });
    })


    test('@allure.id:SRV-LOAD-TC01 Ensure the page "/api/" is responsive.', async () => {
        {
            await allure.description('Ensure that the "/api/" page loads correctly by verifying "/api/" response and App name.');
        }

        await step(`Navigate to "/api/", verify a successful response.`, async () => {
            await Promise.all([
                page.waitForResponse(response =>
                    response.url().endsWith('/api/')
                    && response.status() === 200
                ),
                await page.goto('/api/'),
            ]);
        });

        await step(`Navigate to "/api/", verify the App name "${data.APP_NAME}" is visible.`, async () => {
            await expect(page.getByText(data.APP_NAME)).toBeVisible();
        });
    })

    test('@allure.id:SRV-LOAD-TC02 Ensure the homepage loads correctly.', async () => {
        await allure.description('Ensure that the homepage loads correctly by verifying URL and "/api/users/" response.');

        await step('Navigate to the homepage and wait for a successful "/api/users/" response.', async () => {
            await Promise.all([
                page.waitForResponse(response =>
                    response.url().endsWith('/api/users/') && response.status() === 200
                ),
                page.goto('/'),
            ]);
        });

        await step(`Verify that the homepage URL matches "${process.env.URL}".`, async () => {
            expect(page.url()).toEqual(`${process.env.URL}/`);
        });
    });
})
