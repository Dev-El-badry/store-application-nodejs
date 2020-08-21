const supertest = require('supertest');
const app = require('../app');

describe('Get /api/v1', () => {
    it('should be response a string', async () => {
        const response = await supertest(app)
            .get('/api/v1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.message).toEqual('Store Inventory API');
    })
});