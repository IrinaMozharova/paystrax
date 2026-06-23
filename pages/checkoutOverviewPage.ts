import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly overviewHeader: Locator;
    readonly overviewItems: Locator;
    readonly productNames: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.overviewHeader = page.getByTestId('title');
        this.overviewItems = page.getByTestId('inventory-item');
        this.productNames = page.getByTestId('inventory-item-name');
        this.finishButton = page.getByTestId('finish');
    }

    async expectOpened(): Promise<void> {
        await expect(this.overviewHeader).toHaveText('Checkout: Overview');
    }

    overviewItemByName(productName: string): Locator {
        return this.overviewItems.filter({
            has: this.page.getByTestId('inventory-item-name').filter({
                hasText: new RegExp(`^${this.escapeRegExp(productName)}$`),
            }),
        });
    }

    productNameByName(productName: string): Locator {
        return this.overviewItemByName(productName).getByTestId('inventory-item-name');
    }

    productQuantityByName(productName: string): Locator {
        return this.overviewItemByName(productName).getByTestId('item-quantity');
    }

    async expectProductToBeInOverview(productName: string): Promise<void> {
        await expect(this.overviewItemByName(productName)).toBeVisible();
        await expect(this.productNameByName(productName)).toHaveText(productName);
    }

    async expectProductQuantity(
        productName: string,
        expectedQuantity: number
    ): Promise<void> {
        await expect(this.productQuantityByName(productName)).toHaveText(
            String(expectedQuantity)
        );
    }

    async expectFinishButtonToBeAvailable(): Promise<void> {
        await expect(this.finishButton).toBeVisible();
        await expect(this.finishButton).toBeEnabled();
    }

    async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }

    private escapeRegExp(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}