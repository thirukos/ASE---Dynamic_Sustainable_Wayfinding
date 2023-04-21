const assert = require('assert');
const axios = require('axios');

describe('Security', () => {
    describe('getScore', () => {
        it('should not expose x-api-key in response', async () => {
            const response = await axios.get('http://localhost:3000/getScore');
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data['x-api-key'], undefined);
        });
    });
});
