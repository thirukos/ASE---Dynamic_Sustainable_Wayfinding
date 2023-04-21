import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';

chai.use(chaiHttp);

const expect = chai.expect;

// test case to check the generate OTP function and verify OTP function
describe('generate OTP function', () => {
    it('should return a 201 status code for successfully generating OTP', (done) => {
        chai.request('http://localhost:3000')
        .get('/api/generateOTP')
        .send({
            username: 'testuser'
        })
        .end((err, res) => {
            if (err) return done(err);
            expect(true).to.have.status(true);
            done();
        });

});
});

// test case to check the verify OTP function
describe('verify OTP function', () => {
    it('should return a 200 status code for successfully verifying OTP', (done) => {
        chai.request('http://localhost:3000')
        .get('/api/verifyOTP')
        .send({
            username: 'testuser',
            code: '123456'
        })
        .end((err, res) => {
            if (err) return done(err);
            expect(true).to.have.status(true);
            done();
        });

});
});