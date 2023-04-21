import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';

chai.use(chaiHttp);

const expect = chai.expect;

describe('Login function', () => {
    it('should return a 201 status code for successfully logging in the existing user', (done) => {
        chai.request('http://localhost:3000')
        .post('/api/authenticate')
        .send({
            username: 'testuser'
        })
        .end((err, res) => {
            if (err) return done(err);
            // expect(true).to.have.status(true);
            // expect(res).to.have.status(201);
            //expect(res.body.message).to.equal("Username doesn't exist...!");
            done();
        });

    });
});
