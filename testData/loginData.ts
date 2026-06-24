export const loginCredentials = {
    validUsername: 'standard_user',
    invalidPassword: 'wrong_password',
};

export const loginErrorMessages = {
    usernameRequired: 'Username is required',
    passwordRequired: 'Password is required',
    invalidCredentials: 'Username and password do not match',
};

export const loginValidationScenarios = [
    {
        name: 'empty credentials',
        username: '',
        password: '',
        expectedError: loginErrorMessages.usernameRequired,
    },
    {
        name: 'empty password',
        username: loginCredentials.validUsername,
        password: '',
        expectedError: loginErrorMessages.passwordRequired,
    },
    {
        name: 'invalid password',
        username: loginCredentials.validUsername,
        password: loginCredentials.invalidPassword,
        expectedError: loginErrorMessages.invalidCredentials,
    },
] as const;
