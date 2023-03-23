import chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Weather data testing', () => {
  it('should return the expected current data and city name for the specified geographic coordinates', (done) => {
    const lat = 53.3498; // Dublin latitude
    const lon = -6.2603; // Dublin longitude
    chai.request('http://localhost:3000')
      .get(`/api/weather/${lat}/${lon}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.current.cityName).to.be.a('string'); // check the city name is a string
        expect(res.body.current.temperature).to.be.a('number'); // check the temperature
        done();
      });
  });

  it('should throw an error for invalid geographic coordinates', (done) => {
    const lat = 'invalid'; // invalid latitude
    const lon = -122.4194; // valid longitude
    chai.request('http://localhost:3000')
      .get(`/api/weather/${lat}/${lon}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Cannot find weather data'); // check the error message
        done();
      });
  });
});

