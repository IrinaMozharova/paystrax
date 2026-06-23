import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly completePageHeader: Locator;
    readonly completeContainer: Locator;
    readonly successMessage: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completePageHeader = page.getByTestId('title');
        this.completeContainer = page.getByTestId('checkout-complete-container');
        this.successMessage = page.getByTestId('complete-header');
        this.backHomeButton = page.getByTestId('back-to-products');
    }

    async expectOpened(): Promise<void> {
        await expect(this.completePageHeader).toHaveText('Checkout: Complete!');
        await expect(this.completeContainer).toBeVisible();
        await expect(this.successMessage).toBeVisible();
    }

    async expectSuccessMessage(expectedMessage: string): Promise<void> {
        await expect(this.successMessage).toHaveText(expectedMessage);
    }

    async expectBackHomeButtonToBeAvailable(): Promise<void> {
        await expect(this.backHomeButton).toBeVisible();
        await expect(this.backHomeButton).toBeEnabled();
    }

    async goBackHome(): Promise<void> {
        await this.backHomeButton.click();
    }
}