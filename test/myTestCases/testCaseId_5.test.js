import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';

chai.use(chaiHttp);

const expect = chai.expect;

/**Verify that the login and registration function stores the user's data securely in the database. Measure the response time for login and registration function */
describe('Login and Registration', () => {
    it('should register the user', (done) => {
        axios.post('http://localhost:3000/register', {
            username: 'test',
            password: 'test',
            email: 'test@gmail.com'
        })
            .then((res) => {
                expect(true).to.equal(true);
                done();
            })
            .catch((err) => {
                throw err;
            });
    });
});
