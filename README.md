# Paystrax Playwright Automation Homework

This repository contains a Playwright TypeScript UI automation project.

The project automates the required end-to-end e-commerce flow on Sauce Demo and includes the requested bonus coverage for parallel execution and negative login validation.

Test site:

```text
https://www.saucedemo.com/
```

## Tech Stack

- Playwright Test
- TypeScript
- Node.js
- GitHub Actions

## Test Coverage

### Checkout Flow

The main test covers the required Sauce Demo checkout scenario:

- Open Sauce Demo
- Log in with valid credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`
- Verify the Products page is opened
- Add the following products to the cart:
  - `Sauce Labs Backpack`
  - `Sauce Labs Bike Light`
- Verify the cart badge displays `2`
- Open the cart page
- Verify both selected products are present in the cart
- Verify each selected product has quantity `1`
- Verify product prices in the cart match the prices from the Products page
- Verify the checkout button is visible and enabled
- Fill checkout information:
  - First Name: `Jane`
  - Last Name: `Doe`
  - ZIP Code: `12345`
- Continue to checkout overview
- Verify selected products, quantities, and prices in checkout overview
- Verify the subtotal equals the sum of selected product prices
- Finish checkout
- Verify the success message is displayed:

```text
Thank you for your order!
```

### Negative Login Validation

The negative login test covers the requested bonus scenario and is implemented as a data-driven test.

For each scenario defined in `testData/loginData.ts`, the test:

- Opens Sauce Demo
- Attempts to log in with the scenario-specific invalid credentials
- Verifies that the expected validation error message is displayed
- Verifies that the error close button is visible
- Dismisses the validation error
- Verifies that the error message is hidden after dismissal

This keeps the test easy to extend with additional invalid login scenarios without duplicating the test flow.


## Test Design

The project follows a Page Object Model structure.

Key implementation details:

- Page Object classes are stored in `pages/`
- Test data is stored separately in `testData/`
- Shared helpers are stored in `utils/`
- Tests use Playwright `test.step()` for readable reports
- Selectors use Sauce Demo `data-test` attributes through `testIdAttribute: 'data-test'`
- Product prices are read from the Products page and validated again in the cart and checkout overview
- Prices are converted to cents before subtotal calculation to avoid floating-point precision issues
- Regular expressions are escaped before matching product names to keep selectors safe and deterministic

## Key Files

| Path | Purpose |
| --- | --- |
| `tests/checkoutFlow.spec.ts` | Positive end-to-end checkout flow |
| `tests/loginValidation.spec.ts` | Data-driven negative login validation tests |
| `pages/loginPage.ts` | Login page object |
| `pages/productsPage.ts` | Products page object |
| `pages/cartPage.ts` | Cart page object |
| `pages/checkoutPage.ts` | Checkout information page object |
| `pages/checkoutOverviewPage.ts` | Checkout overview page object |
| `pages/checkoutCompletePage.ts` | Checkout complete page object |
| `testData/checkoutFlowData.ts` | Valid credentials, customer data, products, expected messages |
| `testData/loginData.ts` | Invalid login scenarios and expected validation messages |
| `utils/priceUtils.ts` | Price parsing and formatting helpers |
| `utils/regexUtils.ts` | RegExp escaping helper |
| `playwright.config.ts` | Playwright configuration |
| `tsconfig.json` | TypeScript configuration |
| `.github/workflows/ui-tests.yml` | GitHub Actions workflow for UI tests |

## Prerequisites

Install Node.js before running the project.

Recommended version:

```text
Node.js 20+
```

Playwright requires Node.js 18 or newer.

## Installation

Clone the repository:

```bash
git clone https://github.com/IrinaMozharova/paystrax.git
cd paystrax
```

Install dependencies:

```bash
npm ci
```

Install the configured browsers:

```bash
npx playwright install chrome firefox
```

For Linux environments, install browser system dependencies as well:

```bash
npx playwright install --with-deps chrome firefox
```

## Running Tests Locally

Run all tests on all configured browsers:

```bash
npm test
```

Run only the checkout flow test:

```bash
npm run test:checkout
```

Run only the negative login test:

```bash
npm run test:login
```

Run all tests only on Google Chrome:

```bash
npm run test:chrome
```

Run all tests only on Firefox:

```bash
npm run test:firefox
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run TypeScript type check:

```bash
npm run typecheck
```

Because the project is configured for two browser projects, running all tests executes each spec in both Google Chrome and Firefox.

## Test Report

The project uses the Playwright HTML report.

Open the latest report:

```bash
npm run report
```

The report is generated in:

```text
playwright-report/
```

## Test Artifacts

Failure artifacts are configured in `playwright.config.ts`:

- Screenshot: only on failure
- Trace: retained on failure
- Video: retained on failure

Artifacts are saved in:

```text
test-results/
```

## GitHub Actions Pipeline

Workflow file:

```text
.github/workflows/ui-tests.yml
```

The workflow runs on:

- Push to `main`
- Pull request to `main`
- Manual workflow run

The pipeline:

1. Checks out the repository
2. Sets up Node.js LTS
3. Installs dependencies with `npm ci`
4. Installs Playwright browsers with required dependencies
5. Runs TypeScript type check with `npm run typecheck`
6. Runs UI tests with `npm run test`
7. Uploads Playwright report and test artifacts

Uploaded artifacts include:

```text
playwright-report/
test-results/
```

