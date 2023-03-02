import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';

chai.use(chaiHttp);

const expect = chai.expect;

describe('Mocha can connect to the server', () => {
  it('should respond with a 200 status code', async () => {
    try {
      const response = await chai.request('http://localhost:3000').get('/');
      expect(response).to.have.status(201);
    } catch (error) {
      console.log(error);
      expect.fail(error);
    }
  });
});