import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartHeader: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartHeader = page.getByText('Your Cart', { exact: true });
        this.cartItems = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async expectOpened(): Promise<void> {
        await expect(this.cartHeader).toBeVisible();
    }

    cartItemByName(productName: string): Locator {
        return this.cartItems.filter({
            has: this.page.getByTestId('inventory-item-name').filter({
                hasText: new RegExp(`^${this.escapeRegExp(productName)}$`),
            }),
        });
    }

    productNameByName(productName: string): Locator {
        return this.cartItemByName(productName).getByTestId('inventory-item-name');
    }

    productQuantityByName(productName: string): Locator {
        return this.cartItemByName(productName).getByTestId('item-quantity');
    }

    async expectProductToBeInCart(productName: string): Promise<void> {
        await expect(this.cartItemByName(productName)).toBeVisible();
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

    async expectCheckoutButtonToBeAvailable(): Promise<void> {
        await expect(this.checkoutButton).toBeVisible();
        await expect(this.checkoutButton).toBeEnabled();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    private escapeRegExp(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}