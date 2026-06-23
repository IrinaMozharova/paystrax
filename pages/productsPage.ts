import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productsHeader: Locator;
    readonly productCards: Locator;
    readonly productNames: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.getByText('Products', { exact: true });
        this.productCards = page.getByTestId('inventory-item');
        this.productNames = page.getByTestId('inventory-item-name');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    }

    async expectOpened(): Promise<void> {
        await expect(this.productsHeader).toBeVisible();
    }

    productCardByName(productName: string): Locator {
        return this.productCards.filter({
            has: this.page.getByTestId('inventory-item-name').filter({
                hasText: new RegExp(`^${this.escapeRegExp(productName)}$`),
            }),
        });
    }

    addToCartButtonByProductName(productName: string): Locator {
        return this.productCardByName(productName).getByRole('button', {
            name: 'Add to cart',
        });
    }

    async addProductToCart(productName: string): Promise<void> {
        const productCard = this.productCardByName(productName);
        const addToCartButton = this.addToCartButtonByProductName(productName);

        await expect(productCard).toBeVisible();
        await expect(addToCartButton).toBeVisible();

        await addToCartButton.click();
    }

    async addProductsToCart(productNames: string[]): Promise<void> {
        for (const productName of productNames) {
            await this.addProductToCart(productName);
        }
    }

    async expectCartBadgeToHaveCount(count: number): Promise<void> {
        await expect(this.shoppingCartBadge).toHaveText(String(count));
    }

    async openCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    private escapeRegExp(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}