
const assert = require('assert');
const { describe, it } = require('mocha');

describe('Register', function() {

    it('should not allow user to register without a valid password', function() {

        // Step 1: Navigate to the registration page
        // (Assuming the page is located at http://localhost:3000/register)
        browser.url('http://localhost:3000/register');

        // Step 2: Fill in the registration form with invalid password
        const email = 'test@test.com';
        const username = 'testuser';
        const password = 'invalidpassword';
        const profile = '/path/to/profile/image.png';
        browser.setValue('#email', email);
        browser.setValue('#username', username);
        browser.setValue('#password', password);
        browser.chooseFile('#profile', profile);
        browser.click('#register-btn');

        // Step 3: Verify that the user is not registered
        const errorToast = browser.$('.Toastify__toast--error');
        assert(errorToast.isDisplayed(), 'Error toast should be displayed');
        const successToast = browser.$('.Toastify__toast--success');
        assert(!successToast.isDisplayed(), 'Success toast should not be displayed');

        // Step 4: Verify that the registration form is still displayed
        const registerForm = browser.$('#register-form');
        assert(registerForm.isDisplayed(), 'Registration form should be displayed');
    });
});
