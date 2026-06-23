import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import {
    invalidCredentials,
    loginErrorMessages,
} from '../testData/loginData';

test.describe('Login validation', () => {
    test('user cannot log in with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Open login page', async () => {
            await loginPage.open();
            await loginPage.expectOpened();
        });

        await test.step('Try to log in with invalid password', async () => {
            await loginPage.login(
                invalidCredentials.username,
                invalidCredentials.password
            );
        });

        await test.step('Verify login error message is displayed', async () => {
            await loginPage.expectErrorMessage(
                loginErrorMessages.invalidCredentials
            );
            await loginPage.expectErrorCloseButtonToBeVisible();
        });
    });
});