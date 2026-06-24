import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
        this.errorCloseButton = page.getByTestId('error-button');
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectOpened(): Promise<void> {
        await expect(this.loginButton).toBeVisible();
    }

    async expectErrorMessage(expectedMessage: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async expectErrorCloseButtonToBeVisible(): Promise<void> {
        await expect(this.errorCloseButton).toBeVisible();
    }

    async dismissErrorMessage(): Promise<void> {
        await this.errorCloseButton.click();
    }

    async expectErrorMessageToBeHidden(): Promise<void> {
        await expect(this.errorMessage).toBeHidden();
    }
}
