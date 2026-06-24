import { expect, type Locator, type Page } from '@playwright/test';
import { priceTextToCents } from '../utils/priceUtils';
import { escapeRegExp } from '../utils/regexUtils';

export class ProductsPage {
    readonly page: Page;
    readonly productsHeader: Locator;
    readonly productCards: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.getByText('Products', { exact: true });
        this.productCards = page.getByTestId('inventory-item');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    }

    async expectOpened(): Promise<void> {
        await expect(this.productsHeader).toBeVisible();
    }

    productCardByName(productName: string): Locator {
        return this.productCards.filter({
            has: this.page.getByTestId('inventory-item-name').filter({
                hasText: new RegExp(`^${escapeRegExp(productName)}$`),
            }),
        });
    }

    productPriceByName(productName: string): Locator {
        return this.productCardByName(productName).getByTestId('inventory-item-price');
    }

    addToCartButtonByProductName(productName: string): Locator {
        return this.productCardByName(productName).getByRole('button', {
            name: 'Add to cart',
        });
    }

    async getProductPriceInCents(productName: string): Promise<number> {
        const productPrice = this.productPriceByName(productName);

        await expect(productPrice).toBeVisible();

        const priceText = await productPrice.innerText();

        return priceTextToCents(priceText);
    }

    async addProductToCart(productName: string): Promise<void> {
        const productCard = this.productCardByName(productName);
        const addToCartButton = this.addToCartButtonByProductName(productName);

        await expect(productCard).toBeVisible();
        await expect(addToCartButton).toBeVisible();

        await addToCartButton.click();
    }



    async expectCartBadgeToHaveCount(count: number): Promise<void> {
        await expect(this.shoppingCartBadge).toHaveText(String(count));
    }

    async openCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

}