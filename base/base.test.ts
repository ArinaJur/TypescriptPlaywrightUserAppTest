import {test as base} from "@base/base.page";
import * as preconditions from "@preconditions/preconditions";
import * as data from "@data/users.data";
import * as allure from "allure-js-commons";
import { step, epic, story, link, tags, owner, Severity, allureId, description } from "allure-js-commons";

type MyFixtures = {
    forEachTest: void;
    createDB: void;
}

export const test = base.extend<MyFixtures>({
    forEachTest: [async ({ page }, use) => {
        {
            await owner('ArinaJur');
            await link('https://github.com/ArinaJur/TypescriptPlaywrightUserAppTest');
        }
        await step('Navigate to the Home Page.', async () => {
            await page.goto('/');
        });
        await use();
    }, { auto: true}],

    createDB: [async ({ request }, use) => {
        await step('Delete existing users and create a new user database.', async () => {
            await preconditions.deleteUsers(request);
            await preconditions.createUsers(request, data.users);
        })

        await use();

        await step('Tear Down: Clean up and dispose of the request.', async () => {
            await request.dispose();
        })
    }, { auto: false, title: 'Precondition: Create Users Data Base.' }]
});

export { expect } from '@playwright/test';

export async function allureMeta(epic?: any, story?: any, tags?: any, Severity?: any, description?: any) {
    return await Promise.all([
        epic, story, tags, description, Severity
    ])
}

