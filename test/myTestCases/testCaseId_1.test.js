import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';

chai.use(chaiHttp);

const expect = chai.expect;

describe('Registration function', () => {
    it('should return a 201 status code for successfully registering new user', (done) => {
        chai.request('http://localhost:3000')
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'testuser@gmail.com',
                password: 'password@123'
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(201);
                // expect(res.body.success).to.be.true;
                // expect(res.body.message).to.equal("User Register Successfully");
                done();
            });

    });
});
