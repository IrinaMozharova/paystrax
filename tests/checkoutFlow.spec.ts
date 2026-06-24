import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import {
  checkoutCustomer,
  checkoutMessages,
  credentials,
  expectedCartBadgeCount,
  productQuantities,
  selectedProducts,
} from '../testData/checkoutFlowData';

test.describe('Checkout flow', () => {
  test('user can complete checkout with selected products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    const selectedProductPrices: Record<string, number> = {};

    await test.step('Open login page', async () => {
      await loginPage.open();
      await loginPage.expectOpened();
    });

    await test.step('Log in with valid credentials', async () => {
      await loginPage.login(credentials.username, credentials.password);
      await productsPage.expectOpened();
    });

    await test.step('Save product prices and add selected products to cart', async () => {
      for (const productName of selectedProducts) {
        selectedProductPrices[productName] =
          await productsPage.getProductPriceInCents(productName);

        await productsPage.addProductToCart(productName);
      }

      await productsPage.expectCartBadgeToHaveCount(expectedCartBadgeCount);
    });

    await test.step('Open cart page', async () => {
      await productsPage.openCart();
      await cartPage.expectOpened();
    });

    await test.step('Verify selected products are present in cart', async () => {
      for (const productName of selectedProducts) {
        await cartPage.expectProductToBeInCart(productName);
      }
    });

    await test.step('Verify selected products have correct quantities in cart', async () => {
      for (const productName of selectedProducts) {
        await cartPage.expectProductQuantity(
          productName,
          productQuantities[productName]
        );
      }
    });

    await test.step('Verify product prices in cart match products page prices', async () => {
      for (const productName of selectedProducts) {
        await cartPage.expectProductPrice(
          productName,
          selectedProductPrices[productName]
        );
      }
    });

    await test.step('Proceed to checkout information page', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.expectOpened();
    });

    await test.step('Fill checkout information', async () => {
      await checkoutPage.fillCheckoutInformation(checkoutCustomer);
      await checkoutPage.continueToOverview();
      await checkoutOverviewPage.expectOpened();
    });

    await test.step('Verify selected products are present in checkout overview', async () => {
      for (const productName of selectedProducts) {
        await checkoutOverviewPage.expectProductToBeInOverview(productName);
      }
    });

    await test.step('Verify selected products have correct quantities in checkout overview', async () => {
      for (const productName of selectedProducts) {
        await checkoutOverviewPage.expectProductQuantity(
          productName,
          productQuantities[productName]
        );
      }
    });

    await test.step('Verify product prices in checkout overview match products page prices', async () => {
      for (const productName of selectedProducts) {
        await checkoutOverviewPage.expectProductPrice(
          productName,
          selectedProductPrices[productName]
        );
      }
    });

    await test.step('Verify checkout overview subtotal equals sum of selected product prices', async () => {
      const expectedSubtotalInCents = selectedProducts.reduce(
        (sum, productName) =>
          sum +
          selectedProductPrices[productName] * productQuantities[productName],
        0
      );

      await checkoutOverviewPage.expectSubtotalPrice(expectedSubtotalInCents);
    });

    await test.step('Finish checkout', async () => {
      await checkoutOverviewPage.finishCheckout();
      await checkoutCompletePage.expectOpened();
    });

    await test.step('Verify checkout complete page', async () => {
      await checkoutCompletePage.expectSuccessMessage(
        checkoutMessages.successMessage
      );
      await checkoutCompletePage.expectBackHomeButtonToBeAvailable();
    });
  });
});