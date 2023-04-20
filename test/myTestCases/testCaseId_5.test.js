const { expect } = require('chai');
const { login, register } = require('server/controllers/appController.js');

describe('Login and Registration Functions', () => {
    // Test the Login Function
    describe('Login Function', () => {
        // Test 1: Check if user data are stored in database and password is hashed
        it('should store user data securely in the database', async () => {
            // Create a dummy user to test the login function
            const user = {
                username: 'testuser',
                password: 'testpassword',
            };

            // Call the register function to save the user to the database
            await register({ body: user }, { send: () => {} });

            // Call the login function with the user's credentials
            await login({ body: user }, {
                status: (statusCode) => {
                    expect(statusCode).to.equal(200);
                    return { send: () => {} };
                },
            });

            // Check if the user's password is hashed
            const dbUser = await UserModel.findOne({ username: user.username });
            expect(dbUser.password).to.not.equal(user.password);
        });

        // Test 2: Measure the response time for the login function
        it('should perform well under different load conditions', async () => {
            // TODO: Add performance testing code
        });
    });

    // Test the Registration Function
    describe('Registration Function', () => {
        // Test 1: Check if user data are stored in database and password is hashed
        it('should store user data securely in the database', async () => {
            // Create a dummy user to test the registration function
            const user = {
                username: 'testuser',
                password: 'testpassword',
                email: 'testuser@example.com',
            };

            // Call the register function to save the user to the database
            await register({ body: user }, { send: () => {} });

            // Check if the user's data is stored in the database
            const dbUser = await UserModel.findOne({ username: user.username });
            expect(dbUser).to.exist;
            expect(dbUser.username).to.equal(user.username);
            expect(dbUser.email).to.equal(user.email);

            // Check if the user's password is hashed
            expect(dbUser.password).to.not.equal(user.password);
        });

        // Test 2: Measure the response time for the registration function
        it('should perform well under different load conditions', async () => {
            // TODO: Add performance testing code
        });
    });
});
