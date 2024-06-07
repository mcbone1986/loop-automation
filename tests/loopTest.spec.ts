import { test, expect } from '@playwright/test';
import testCases from './testCases.json';

// Login Function
async function login(page) {
    await page.goto('https://app.asana.com/-/login');
    await test.step('Enter email address', async () => {
        await page.getByLabel('Email address').click();
        await page.getByLabel('Email address').fill('ben+pose@workwithloop.com');
    });
    await test.step('Click Continue', async () => {
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
    });
    await test.step('Enter password', async () => {
        await page.getByLabel('Password', { exact: true }).fill('Password123');
    });
    await test.step('Click Log in', async () => {
        await page.getByRole('button', { name: 'Log in' }).click();
    });
}

// Login before each test
test.beforeEach(async ({ page }) => {
    await login(page);
});

// Function to run test cases
async function runTestCase(page, testCase) {
    await test.step(`Navigate to ${testCase.leftNav}`, async () => {
        await page.getByLabel(testCase.leftNav).click();
        await expect(page.getByRole('heading', { name: testCase.leftNav.split(',')[0] }).getByRole('textbox')).toBeVisible();
    });

    await test.step('Validate the card title within the column', async () => {
        const cardLocator = page.getByText(testCase.card_title);
        await expect(cardLocator).toBeVisible();

        // Hover to verify each tag using provided locators
        // for (let index = 0; index < testCase.tags.length; index++) { //goes through tag array
        //     const tag = testCase.tags[index]; //assigns tag var from tag array
        //     await test.step(`Verify tag ${tag}`, async () => { //test step verifying var tag
        // const tagIconLocator1 = cardLocator.locator('div:nth-child(2) > .SortableItem > div > .RightClickMenu-contextMenuEventListener > div > div > .BoardCardLayout > .BoardCardLayout-contentAboveSubtasks > .BoardCardLayout-customPropertiesAndTags > .BoardCardCustomPropertiesAndTags > div > .Icon > path').first(); //locator
        // const tagIconLocator2 = cardLocator.locator('div:nth-child(2) > .SortableItem > div > .RightClickMenu-contextMenuEventListener > div > div > .BoardCardLayout > .BoardCardLayout-contentAboveSubtasks > .BoardCardLayout-customPropertiesAndTags > .BoardCardCustomPropertiesAndTags > div:nth-child(2) > .Icon > path').first(); //locator
        // const tagIconLocator1 = cardLocator.locator('.BoardCardCustomPropertiesAndTags > div > .Icon > path').first(); //maybe using different locator can help?
        // const tagIconLocator2 = cardLocator.locator('.BoardCardCustomPropertiesAndTags > div:nth-child(2) > .Icon > path').first(); //maybe using different locator can help?

        // Log if locators are found
        //         const isTagIconLocator1Visible = await tagIconLocator1.isVisible();
        //         console.log(`Tag Icon Locator 1 visible: ${isTagIconLocator1Visible}`);
        //         const isTagIconLocator2Visible = await tagIconLocator2.isVisible();
        //         console.log(`Tag Icon Locator 2 visible: ${isTagIconLocator2Visible}`);

        //         await expect(tagIconLocator1).toBeVisible(); // cannot find tagIconLocator1, need better locator?
        //         await tagIconLocator1.hover(); //hover over tagIconLocator1
        //         await expect(page.getByText(tag)).toBeVisible(); //assert text is visible after hovering

        //         await expect(tagIconLocator2).toBeVisible();
        //         await tagIconLocator2.hover();
        //         await expect(page.getByText(tag)).toBeVisible();
        //     });
        // }


        await test.step('Click on the card to open details', async () => {
            const cardToClick = page.getByText(`${testCase.card_title}`);
            await cardToClick.click();
        });

        await test.step('Verify the task name in the details', async () => {
            await expect(page.getByPlaceholder('Write a task name')).toBeVisible();
            await expect(page.getByPlaceholder('Write a task name')).toContainText(testCase.card_title);
        });

        // Verify the tags in the details
        for (const tag of testCase.tags) {
            await test.step(`Verify tag ${tag} in the details`, async () => {
                await expect(page.getByRole('link', { name: `${tag} Remove` })).toBeVisible();
            });
        }
    });
}

// Running the test cases
for (const testCase of testCases) {
    test(testCase.name, async ({ page }) => {
        await runTestCase(page, testCase);
    });
}
