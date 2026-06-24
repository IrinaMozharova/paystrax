import { expect, type Locator, type Page } from '@playwright/test';
import { formatCentsAsPrice } from '../utils/priceUtils';
import { escapeRegExp } from '../utils/regexUtils';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly overviewHeader: Locator;
    readonly overviewItems: Locator;
    readonly subtotalLabel: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.overviewHeader = page.getByTestId('title');
        this.overviewItems = page.getByTestId('inventory-item');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.finishButton = page.getByTestId('finish');
    }

    async expectOpened(): Promise<void> {
        await expect(this.overviewHeader).toHaveText('Checkout: Overview');
    }

    overviewItemByName(productName: string): Locator {
        return this.overviewItems.filter({
            has: this.page.getByTestId('inventory-item-name').filter({
                hasText: new RegExp(`^${escapeRegExp(productName)}$`),
            }),
        });
    }

    productNameByName(productName: string): Locator {
        return this.overviewItemByName(productName).getByTestId('inventory-item-name');
    }

    productQuantityByName(productName: string): Locator {
        return this.overviewItemByName(productName).getByTestId('item-quantity');
    }

    productPriceByName(productName: string): Locator {
        return this.overviewItemByName(productName).getByTestId('inventory-item-price');
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

    async expectProductPrice(
        productName: string,
        expectedPriceInCents: number
    ): Promise<void> {
        await expect(this.productPriceByName(productName)).toHaveText(
            formatCentsAsPrice(expectedPriceInCents)
        );
    }

    async expectSubtotalPrice(expectedSubtotalInCents: number): Promise<void> {
        await expect(this.subtotalLabel).toContainText(
            formatCentsAsPrice(expectedSubtotalInCents)
        );
    }

    async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }

}