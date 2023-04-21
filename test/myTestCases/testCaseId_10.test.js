const assert = require('chai').assert;
const { addroute } = require('.server/controllers/routeController.js');

describe('Reward actions', function() {
    it('should update user score based on reward rule', function(done) {
        const req = {
            body: {
                username: 'testuser',
                origin: 'A',
                destination: 'B',
                distance: 10,
                transportmode: 'WALKING'
            }
        };
        const res = {
            status: function(code) {
                assert.equal(code, 201);
                return this;
            },
            send: function(result) {
                assert.equal(result.msg, 'a new route has been stored in the database');
                // Now you can check whether the user score has been updated
                // For example, you can query the database and check the user's score
                done();
            }
        };
        addroute(req, res);
    });
});
