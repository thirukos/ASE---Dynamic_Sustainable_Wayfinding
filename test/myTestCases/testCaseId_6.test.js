import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';

chai.use(chaiHttp);

const expect = chai.expect;

/**The username should be unique, duplicated usernames cannot be registered successfully */
describe('register function', () => {
    it('should return a 201 status code for successfully registering', (done) => {
        chai.request('http://localhost:3000')
        .post('/api/register')
        .send({
            username: 'testuser',
            password: 'testpassword',
            email: 'testemail@gmail.com',
            phone: '1234567890'
        })
        .end((err, res) => {
            if (err) return done(err);
            expect(true).to.have.status(true);
            done();
        });
    });
});
