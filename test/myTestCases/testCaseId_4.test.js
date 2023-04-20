const chai = require('chai');
const expect = chai.expect;
const { generateOTP, verifyOTP } = require('../helper/helper');

describe('Recovery', function() {
    let username = 'testuser@test.com';
    let OTP = '';

    before(async function() {
        OTP = await generateOTP(username);
        console.log('OTP:', OTP);
    });

    it('should be able to verify OTP and reset password', async function() {
        let result = await verifyOTP({ username: username, code: OTP });
        expect(result.status).to.equal(201);
        // Add further tests to verify that user is able to reset password
    });

});
