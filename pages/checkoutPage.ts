import { expect, type Locator, type Page } from '@playwright/test';

export type CheckoutInformation = {
    firstName: string;
    lastName: string;
    postalCode: string;
};

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutHeader: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutHeader = page.getByTestId('title');
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
    }

    async expectOpened(): Promise<void> {
        await expect(this.checkoutHeader).toHaveText('Checkout: Your Information');
    }

    async fillCheckoutInformation({
        firstName,
        lastName,
        postalCode,
    }: CheckoutInformation): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview(): Promise<void> {
        await this.continueButton.click();
    }
}