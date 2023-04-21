const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Check-in functionality', () => {
    it('Should successfully check-in and update score', (done) => {
        const user = {
            username: 'testuser',
            origin: 'A',
            destination: 'B',
            distance: 10,
            transportmode: 'WALKING',
        };

        request(app)
            .post('/api/addroute')
            .send(user)
            .end((err, res) => {
                assert.equal(res.status, 201);
                UserModel.findOne({ username: user.username }, function (err, user) {
                    if (err) console.log('err');
                    else {
                        assert.equal(user.score, 10);
                        done();
                    }
                });
            });
    });

    it('Should not allow checking in more than once per day', (done) => {
        // TODO: Write test case for not allowing checking in more than once per day
        done();
    });
});
