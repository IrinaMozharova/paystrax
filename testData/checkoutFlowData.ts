export const credentials = {
    username: 'standard_user',
    password: 'secret_sauce',
};

export const checkoutCustomer = {
    firstName: 'Jane',
    lastName: 'Doe',
    postalCode: '12345',
};

export const products = {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
};

export const selectedProducts = [
    products.backpack,
    products.bikeLight,
];

export const productQuantities = {
    [products.backpack]: 1,
    [products.bikeLight]: 1,
};

export const expectedCartBadgeCount = selectedProducts.length;

export const checkoutMessages = {
    completePageTitle: 'Checkout: Complete!',
    successMessage: 'Thank you for your order!',
};