import { test, expect, chromium } from '@playwright/test'
import * as fs from "node:fs";

test.beforeAll("SetUp", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await Promise.all([
        page.waitForResponse(response =>
            response.url().endsWith('/api/')
            && response.status() === 200
        ),
        await page.goto('/api/'),
    ]);
});

test('Check if server is alive', async({ page }) => {
    await Promise.all([
        page.waitForResponse(response =>
            response.url().endsWith('/api/users/')
            && response.status() === 200
        ),
        await page.goto('/'),
    ]);
    expect(page.url()).toEqual(`${process.env.URL}/`);
})

