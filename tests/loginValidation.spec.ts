import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { loginValidationScenarios } from '../testData/loginData';

test.describe('Login validation', () => {
    for (const scenario of loginValidationScenarios) {
        test(`user cannot log in with ${scenario.name}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await test.step('Open login page', async () => {
                await loginPage.open();
                await loginPage.expectOpened();
            });

            await test.step(`Try to log in with ${scenario.name}`, async () => {
                await loginPage.login(scenario.username, scenario.password);
            });

            await test.step(
                `Verify the error for ${scenario.name} is displayed`,
                async () => {
                    await loginPage.expectErrorMessage(scenario.expectedError);
                    await loginPage.expectErrorCloseButtonToBeVisible();
                }
            );

            await test.step('Dismiss the login validation error', async () => {
                await loginPage.dismissErrorMessage();
                await loginPage.expectErrorMessageToBeHidden();
            });
        });
    }
});
